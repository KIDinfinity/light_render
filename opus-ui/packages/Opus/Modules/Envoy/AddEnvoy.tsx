import React, { useState } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { Icon, Button, Modal } from 'antd';
import {
  EGlobalAuthCode,
  EReasonStatus,
  EnvoyButtonType,
  EnovyPreviewMode,
} from 'bpm/pages/Envoy/enum';
import usePublishEnvoyChange from '@mc/hooks/usePublishEnvoyChange';
import bpm from 'bpm/pages/OWBEntrance';
import { tarckInquiryPoint, eEventName } from '@/components/TarckPoint';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { notAddEnvoy, isDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import AddEnvoyItem from './AddEnvoyItem';
import styles from './AddEnvoy.less';
import { v4 as uuidv4 } from 'uuid';
import { handleMessageModal, handleWarnMessageModal } from '@/utils/commonMessage';
import useFindSuccessTemplateByGroupIdCallback from 'bpm/pages/Envoy/hooks/useFindSuccessTemplateByGroupIdCallback';
import useHandleSendEnvoyCallback from 'bpm/pages/Envoy/hooks/useHandleSendEnvoyCallback';
import { tenant, Region } from '@/components/Tenant';
import { ReactComponent as PreviewSvg } from './Assets/preview.svg';
import { ReactComponent as SuccessSvg } from './Assets/success.svg';
import { ReactComponent as FailSvg } from './Assets/fail.svg';
import withTimeout from '@/utils/withTimeout';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';
interface IProps {}

export default ({}: IProps) => {
  const currentReasonGroups =
    useSelector((state) => lodash.get(state, 'envoyController.currentReasonGroups')) || [];

  const taskStatus = useSelector((state) => lodash.get(state, 'envoyController.taskStatus'));
  const reasonConfigs = useSelector((state) => lodash.get(state, 'envoyController.reasonConfigs'));
  const envoyEdit = useSelector((state) => lodash.get(state, 'envoyController.envoyEdit'));
  const { sendConditionShow, resultInfoStatus }: any = useSelector((state) =>
    lodash.get(state, 'envoyController.sendCondition')
  );
  const globalAuth = useSelector((state) =>
    lodash.get(state, `authController.${EGlobalAuthCode.EDIT}`)
  );
  const [submitLoading, setSubmitLoading] = useState(false);
  const draftGroups = currentReasonGroups.filter(({ status }) => status === EReasonStatus.DRAFT);
  const groupCodes = lodash.map(draftGroups, 'groupCode');
  const activePermission = lodash.some(reasonConfigs, (item: any) => {
    if (
      lodash.isBoolean(item.envoyEdit) &&
      !item.envoyEdit &&
      lodash.includes(groupCodes, item.code)
    ) {
      return true;
    }
    return false;
  });
  const dispatch = useDispatch();
  const handlerEnvoySended = usePublishEnvoyChange();
  const getCurrentReasonConfigByGroupCode = (groupCode: any) => {
    return lodash
      .chain(reasonConfigs)
      .pickBy(lodash.isObject as any)
      .find({ code: groupCode })
      .value();
  };

  const validateFields = async () => {
    return await dispatch({
      type: 'envoyController/validateFields',
      payload: {
        allGroups: true,
      },
    });
  };

  const findSuccessTemplateByGroupId = useFindSuccessTemplateByGroupIdCallback();

  const handleSendEnvoy = useHandleSendEnvoyCallback();
  const sendEnvoyV2 = async () => {
    setSubmitLoading(true);
    await handleSendEnvoy();
    setSubmitLoading(false);
  };

  const sendEnvoy = async (type: any) => {
    const hasError = await validateFields();

    const otherError = await dispatch({
      type: 'envoyController/validateExtraFields',
    });

    if (!hasError && !otherError && draftGroups.length) {
      await bpm.buttonAction('save');
      const promiseArr: Promise<any>[] = [];
      const responseArr: Promise<any>[] = [];
      let reasonDetailsList: any = [];
      setSubmitLoading(true);
      draftGroups.map(async (reasonGroup) => {
        let resolveData = { result: true, data: {} };
        const currentReasonConfig = getCurrentReasonConfigByGroupCode(reasonGroup?.groupCode);
        if (
          EnovyPreviewMode.MUSTPREVIEW === currentReasonConfig?.previewMode ||
          (type === EnvoyButtonType.PREVIEW &&
            EnovyPreviewMode.CANPREVIEW === currentReasonConfig?.previewMode)
        ) {
          resolveData = new Promise(async (resolve) => {
            const response = await dispatch({
              type: 'envoyController/getPreivewModeData',
              payload: {
                reasonGroup,
                previewResolve: resolve,
                show: true,
                title: currentReasonConfig?.name,
              },
            });
            resolve(response);
          });
          responseArr.push(withTimeout(resolveData));
        }
        if (!resolveData?.result || type === EnvoyButtonType.PREVIEW) return;
        const promise: any = dispatch({
          type: 'envoyController/sendEnvoy',
          payload: {
            reasonGroup,
            otherData: resolveData?.data,
          },
        });
        promise?.then((result) => {
          handlerEnvoySended(result?.res?.resultData);
          reasonDetailsList = lodash.concat(
            reasonDetailsList,
            result?.res?.resultData?.reasonDetails || []
          );
          if (result.res.success && result.res.resultData.externalUrl) {
            tarckInquiryPoint(dispatch, {
              eventName: eEventName.correspondence,
              eventOperation: result?.params?.name,
              processInstanceId: result?.params?.caseNo,
              inquiryBusinessNo: result?.params?.inquiryBusinessNo,
              caseCategory: result?.params?.caseCategory,
              activityKey: result?.params?.activityKey,
            });
          } else {
            setSubmitLoading(false);
          }
        });
        promiseArr.push(withTimeout(promise));
      });
      if (type === EnvoyButtonType.PREVIEW) {
        Promise.allSettled(responseArr).then(async (response) => {
          const resArr = lodash.map(response, ({ value }: any) => value);
          const allFail = lodash
            .chain(resArr)
            .map(({ success }: any) => success)
            .every((success) => !success)
            .value();
          const allEmptyLetter = lodash
            .chain(resArr)
            .map(({ resultData }: any) => resultData?.letters)
            .every(
              (letters) =>
                lodash.isEmpty(letters) ||
                lodash.every(
                  letters,
                  (letter) => !['email', 'sms', 'doc'].includes(letter.letterType)
                )
            )
            .value();
          if (allFail || allEmptyLetter) {
            dispatch({
              type: 'envoyController/clearPreivewModeData',
            });
            if (allFail) {
              handleMessageModal(lodash.first(resArr)?.promptMessages);
            } else if (allEmptyLetter) {
              handleWarnMessageModal(
                [
                  {
                    content: formatMessageApi({
                      Label_COM_WarningMessage: 'MSG_000788',
                    }),
                  },
                ],
                {
                  okFn: () => {},
                  cancelFn: () => {},
                }
              );
            }
          }
        });
        setSubmitLoading(false);
        return;
      }
      Promise.allSettled(promiseArr).then(async () => {
        await findSuccessTemplateByGroupId(reasonDetailsList);
        setSubmitLoading(false);
      });
    }
  };

  const showPreview = (() => {
    return lodash
      .chain(draftGroups)
      .some((item) => {
        const { status, sendControl, groupCode }: any = item;
        const currentReasonConfig = getCurrentReasonConfigByGroupCode(groupCode);
        const { previewMode, existCorrespondenceFlag } = lodash.pick(currentReasonConfig, [
          'previewMode',
          'existCorrespondenceFlag',
        ]);
        return (
          (tenant.region() === Region.JP ? existCorrespondenceFlag === 'Y' : true) &&
          isDraftReason(status) &&
          sendControl &&
          [EnovyPreviewMode.CANPREVIEW, EnovyPreviewMode.MUSTPREVIEW].includes(previewMode)
        );
      })
      .value();
  })();

  const onCancel = () => {
    dispatch({
      type: 'envoyController/setSendCondition',
      payload: {
        sendConditionShow: false,
      },
    });
  };

  const disabledEnvoy = notAddEnvoy({
    taskStatus,
    globalAuth,
  });

  const [initEnvoyId, setInitEnvoyId] = useState<false | string>(false);

  return (
    <div>
      <div className={styles.addEnvoyCard}>
        <div className={styles.envoyCardTitle}>
          <Icon type="plus" />
          {formatMessageApi({ Label_Sider_Envoy: 'addPendReq' })}
        </div>
        <div className={styles.envoyContent}>
          {draftGroups.map((item: any, groupIdx) => (
            <AddEnvoyItem
              reasonGroup={item}
              key={item.id}
              overrideLoading={initEnvoyId && item.id === initEnvoyId}
              disabled={disabledEnvoy}
              groupIdx={groupIdx}
              envoyEdit={lodash.find(reasonConfigs, { code: item.groupCode })?.envoyEdit}
            />
          ))}
        </div>
      </div>
      <div className={styles.buttonList}>
        {showPreview && (
          <Button
            onClick={() => sendEnvoy(EnvoyButtonType.PREVIEW)}
            loading={false}
            className={styles.standardButton}
          >
            <Icon type="plus" component={PreviewSvg} />
            {formatMessageApi({
              Label_Sider_Envoy: 'PreviewLetter',
            })}
          </Button>
        )}
        <AuthorizedAtom
          currentAuthority={'RS_BP_Button_Envoy_AddPendRecord'}
          key="RS_BP_Button_Envoy_AddPendRecord"
        >
          <Button
            onClick={async () => {
              const id = uuidv4();
              dispatch({
                type: 'envoyController/addEnvoy',
                payload: {
                  requestType: 'Pending',
                  id,
                  status: EReasonStatus.DRAFT,
                },
              });

              if (tenant.region() === Region.JP) {
                setInitEnvoyId(id);
                await dispatch({
                  type: 'envoyController/setReasonGroup',
                  payload: {
                    id,
                    groupCode: 'P_CLM_PND_ExternalPending',
                  },
                });
                setInitEnvoyId(false);
              }
            }}
            className={styles.standardButton}
            disabled={
              !!initEnvoyId ||
              notAddEnvoy({
                taskStatus,
                globalAuth,
              }) ||
              !envoyEdit
            }
          >
            <Icon type="plus" />
            {formatMessageApi({ Label_Sider_Envoy: 'addPendReason' })}
          </Button>
        </AuthorizedAtom>
        <Button
          type="primary"
          disabled={
            notAddEnvoy({
              taskStatus,
              globalAuth,
            }) || activePermission
          }
          onClick={sendEnvoyV2}
          loading={submitLoading}
        >
          {formatMessageApi({
            Label_Sider_Envoy: 'Send',
          })}
        </Button>
      </div>
      <Modal
        className={styles.modal}
        closable={false}
        centered
        visible={sendConditionShow}
        title={
          <span className={styles.modalTitle}>
            {resultInfoStatus === 'Success' ? (
              <Icon component={SuccessSvg} className={styles.titleIcon} />
            ) : (
              <Icon component={FailSvg} className={styles.titleIcon} />
            )}
            <span>
              {formatMessageApi({
                Label_COM_Opus: resultInfoStatus,
              })}
            </span>
          </span>
        }
        onCancel={onCancel}
        footer={[
          <Button key="Cancel" type="primary" onClick={onCancel}>
            {formatMessageApi({
              Label_BPM_Button: 'Close',
            })}
          </Button>,
        ]}
      >
        {resultInfoStatus === 'Success'
          ? formatMessageApi({
              Label_COM_WarningMessage: 'MSG_001178',
            })
          : formatMessageApi({
              Label_COM_WarningMessage: 'MSG_001177',
            })}
      </Modal>
    </div>
  );
};
