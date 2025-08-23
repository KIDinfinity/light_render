import lodash from 'lodash';
import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { changeCustomerInformation } from '@/services/owbNbProposalControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { listDedupCheckCfg } from '@/services/owbNbDropdownControllerService';
import { NbClientTag } from 'process/NB/CustomerIdentification/Enum';
import matchValueByTransConfig from 'process/NB/ManualUnderwriting/utils/matchValueByTransConfig';
import { transConfig } from 'process/NB/ManualUnderwriting/_hooks/data.trans.config';
import {
  handleErrorMessageIgnoreXErrorNotice,
  handleWarnMessageModal,
} from '@/utils/commonMessage';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleSubmitClientChange from 'process/NB/ManualUnderwriting/_hooks/useHandleSubmitClientChange';

export default (auto = false) => {
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const originBizData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.originBizData,
    shallowEqual
  );
  const handleSubmitClientChange = useHandleSubmitClientChange();
  return useCallback(async () => {
    let isBreak = false;
    const roleConfigResponse = await listDedupCheckCfg();
    const roleDedupCheckConfig = lodash
      .chain(roleConfigResponse)
      .get('resultData', [])
      .filter((role) => role?.isDedupCheck === 'Y')
      .map((role) => role?.customerRole)
      .value();
    await dispatch({
      type: `${NAMESPACE}/savePerposal`,
    });
    const clientInfoList = lodash.get(businessData, 'policyList[0].clientInfoList', []);
    const originClientInfoList = lodash.get(originBizData, 'policyList[0].clientInfoList', []);
    let isKeyInformationChange = false;
    const dataKeys = tenant.region({
      [Region.TH]: ['identityType', 'identityNo', 'customerType'],
      notMatch: [
        'dateOfBirth',
        'firstName',
        'surname',
        'customerEnFirstName',
        'customerEnSurname',
        'gender',
        'identityType',
        'identityNo',
        'preferredName',
        'customerType',
      ],
    });
    lodash.forEach(clientInfoList, (clientItem: any) => {
      const id = clientItem?.id;
      let hasDedupCheckRole = false;
      const roleList = clientItem?.roleList?.filter((roleData) => !roleData.deleted);
      lodash.forEach(roleList, (role) => {
        if (roleDedupCheckConfig.includes(role?.customerRole)) {
          hasDedupCheckRole = true;
        }
      });
      // 点击confirm时，skip当前没有勾选role的client
      if (!lodash.isEmpty(roleList) && hasDedupCheckRole) {
        const originClientItem = lodash
          .chain(originClientInfoList)
          .find((item: any) => item?.id === id)
          .value();
        if (!originClientItem) {
          isKeyInformationChange = true;
        } else {
          // 判断六要素改变
          lodash.forEach(dataKeys, (key) => {
            const originData = (() => {
              if (lodash.get(transConfig, key)) {
                return matchValueByTransConfig({
                  item: originClientItem,
                  path: lodash.get(transConfig, key),
                });
              }
              return lodash.get(originClientItem, key);
            })();
            const changedData = (() => {
              if (lodash.get(transConfig, key)) {
                return matchValueByTransConfig({
                  item: clientItem,
                  path: lodash.get(transConfig, key),
                });
              }
              return lodash.get(clientItem, key);
            })();
            if (
              !lodash.isEqual(formUtils.queryValue(originData), formUtils.queryValue(changedData))
            ) {
              isKeyInformationChange = true;
            }
          });
        }
      }
    });
    const confirmHandler = async () => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const data = {
        ...dataForSubmit,
        taskId: taskDetail?.taskId,
        caseCategory: taskDetail?.caseCategory,
        activityKey: taskDetail?.taskDefKey,
        businessNo: taskDetail?.businessNo,
      };

      const response = await changeCustomerInformation({
        ...data,
      });
      const { success, resultData } = lodash.pick(response, [
        'success',
        'resultData',
        'promptMessages',
      ]);
      if (success && lodash.isPlainObject(resultData)) {
        await dispatch({
          type: `${NAMESPACE}/saveCustomerIndentificationData`,
          payload: {
            customerIndentificationData: resultData,
          },
        });
        await dispatch({
          type: 'claimEditable/setTaskNotEditable',
          payload: {
            taskNotEditable: false,
          },
        });
        lodash
          .chain(resultData)
          .get('policyList[0].clientInfoList', [])
          .forEach((client: any) => {
            lodash
              .chain(client)
              .get('identificationList', [])
              .forEach((identification: any) => {
                if (identification.clientTag === NbClientTag.SuspectClient) {
                  isBreak = true;
                }
              })
              .value();
          })
          .value();
        await dispatch({
          type: `${NAMESPACE}/updateClientsByDedupcheck`,
          payload: {
            customerIndentificationData: resultData,
          },
        });
        if (!isBreak) {
          const updateClientResponse: any = await handleSubmitClientChange();
          return !updateClientResponse?.success;
        }
      }

      if (!success) {
        handleErrorMessageIgnoreXErrorNotice(response);
        return true;
      }
      if (isBreak) {
        await dispatch({
          type: `${NAMESPACE}/setIndentificationModalVisible`,
          payload: {
            indentificationModalVisible: true,
          },
        });
      }
      return isBreak;
    };
    return new Promise((resolve) => {
      if (auto) {
        resolve(confirmHandler());
      }

      if (isKeyInformationChange) {
        if (tenant.region() === Region.MY) {
          (async () => {
            handleWarnMessageModal(
              [
                {
                  content: formatMessageApi({
                    Label_COM_WarningMessage: 'MSG_000713',
                  }),
                },
              ],
              {
                okFn: async () => {
                  await resolve(confirmHandler());
                },
                cancelFn: async () => {
                  await resolve(true);
                },
              }
            );
          })();
        } else {
          resolve(confirmHandler());
        }
      } else {
        resolve(false);
      }
    });
  }, [taskDetail, businessData, originBizData, dispatch, handleSubmitClientChange, auto]);
};
