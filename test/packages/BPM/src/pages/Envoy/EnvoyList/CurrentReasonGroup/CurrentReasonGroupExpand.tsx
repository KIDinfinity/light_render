import React, { useMemo } from 'react';
import { connect } from 'dva';
import { Button, Icon, notification } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as SendIcon } from 'bpm/assets/sent.svg';
import bpm from 'bpm/pages/OWBEntrance';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import CurrentReason from 'bpm/pages/Envoy/EnvoyList/CurrentReason/CurrentReason';
import { isDraftReason, notSetResolve, notSendEnvoy } from 'bpm/pages/Envoy/_utils/getDisabled';
import { tarckInquiryPoint, eEventName } from '@/components/TarckPoint';
import {
  EGlobalAuthCode,
  ESelfAuthCode,
  EReasonStatus,
  EnvoyButtonType,
  EnovyPreviewMode,
} from 'bpm/pages/Envoy/enum';
import styles from './currentReasonGroup.less';
import usePublishEnvoyChange from '@mc/hooks/usePublishEnvoyChange';
import classnames from 'classnames';

interface IConnectProps {
  dispatch: Function;
  authEnvoy: any;
  taskId: string;
  reasonConfigs: any[];
  activedGroupKey: string[] | null;
  historyGroupKey: string[] | null;
}

interface IProps extends IConnectProps {
  reasonGroup: any;
  groupIdx: number;
  isCurrentList: boolean;
}

const CurrentReasonGroup = (props: IProps) => {
  const { dispatch, authEnvoy, reasonConfigs, reasonGroup, groupIdx, isCurrentList } = props;
  const { envoyAuth, status, allowActions, reasonDetails, groupCode } = lodash.pick(reasonGroup, [
    'envoyAuth',
    'status',
    'allowActions',
    'reasonDetails',
    'groupCode',
  ]);
  const loading = useSelector(
    (state) => state.loading.effects['envoyController/setStatus'],
    shallowEqual
  );
  const initLoading = useSelector(
    (state) => state.loading.effects['envoyController/getReasonConfigs'],
    shallowEqual
  );
  const sendEnvoyLoading = useSelector(
    (state) => state.loading.effects['envoyController/sendEnvoy'],
    shallowEqual
  );

  const currentReasonConfig = lodash
    .chain(reasonConfigs)
    .pickBy(lodash.isObject as any)
    .find({ code: groupCode })
    .value();

  const handlerEnvoySended = usePublishEnvoyChange();
  const setStatus = async (key): void => {
    const resultData = await dispatch({
      type: 'envoyController/setStatus',
      payload: {
        groupIdx,
        status: key,
      },
    });
    handlerEnvoySended(resultData);
  };

  const sendEnvoy = async (type, ev) => {
    ev.stopPropagation();
    const isBeforeDispatchDate = lodash.some(reasonGroup?.reasonDetails, (reason: any) => {
      const sortModuleArr = getSortModuleArr(reason?.displayConfig);
      const hasModule = lodash.some(
        sortModuleArr,
        (module: any) => module.moduleName === 'dispatchDate'
      );
      const isBeforeDate = moment(reason.dispatchDate).isBefore(moment(new Date()), 'days');
      return hasModule && isBeforeDate;
    });
    if (isBeforeDispatchDate) {
      notification.open({
        description: formatMessageApi({ Label_COM_WarningMessage: 'app.pending.message.outdate' }),
      });
      return;
    }
    const hasError = await dispatch({
      type: 'envoyController/validateEnvoy',
      payload: {
        reasonGroup,
      },
    });
    if (!hasError) {
      await bpm.buttonAction('save', { syncData: true });
      let resolveData = { result: true, data: {} };
      if (
        EnovyPreviewMode.MUSTPREVIEW === currentReasonConfig?.previewMode ||
        (type === EnvoyButtonType.PREVIEW &&
          EnovyPreviewMode.CANPREVIEW === currentReasonConfig?.previewMode)
      ) {
        resolveData = await new Promise((resolve) => {
          dispatch({
            type: 'envoyController/getPreivewModeData',
            payload: {
              reasonGroup,
              previewResolve: resolve,
              show: true,
              title: currentReasonConfig?.name,
            },
          });
        });
      }
      if (!resolveData?.result) return;

      const result = await dispatch({
        type: 'envoyController/sendEnvoy',
        payload: {
          reasonGroup,
          otherData: resolveData?.data,
        },
      });
      handlerEnvoySended(result?.res?.resultData);
      if (result.res.success && result.res.resultData.externalUrl) {
        tarckInquiryPoint(dispatch, {
          eventName: eEventName.correspondence,
          eventOperation: result?.params?.name,
          processInstanceId: result?.params?.caseNo,
          inquiryBusinessNo: result?.params?.inquiryBusinessNo,
          caseCategory: result?.params?.caseCategory,
          activityKey: result?.params?.activityKey,
        });
      }
    }
  };
  const sendControl = lodash.get(reasonGroup, 'sendControl');

  return useMemo(() => {
    return (
      <div className={styles.currentReasonGroup}>
        {initLoading ? (
          <Icon type="loading" />
        ) : (
          <div className={styles.expandCard}>
            <div style={{ display: 'flex' }}>
              <div className={styles.title}>{reasonGroup?.name}</div>
              <div
                className={status === EReasonStatus.ACTIVE ? styles.activeBox : styles.inactiveBox}
              >
                {formatMessageApi({
                  Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${status}`,
                })}
              </div>
              <div style={{ flexGrow: 1 }} />
              {isCurrentList && (
                <div className={classnames(styles.btnGroup, styles.expandBtnGroup)}>
                  {isDraftReason(status) &&
                    sendControl &&
                    [EnovyPreviewMode.CANPREVIEW, EnovyPreviewMode.MUSTPREVIEW].includes(
                      currentReasonConfig?.previewMode
                    ) && (
                      <Button
                        loading={loading || sendEnvoyLoading}
                        className="Preivew"
                        onClick={sendEnvoy.bind(null, EnvoyButtonType.PREVIEW)}
                      >
                        {formatMessageApi({
                          Label_Sider_Envoy: 'Preview',
                        })}
                      </Button>
                    )}
                  {lodash
                    .chain(allowActions)
                    .filter((item: string) => {
                      if (item === 'Save' && status === EReasonStatus.ACTIVE) {
                        return false;
                      }
                      const disabled = notSetResolve({
                        globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
                        selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
                        envoyData: reasonDetails,
                        status,
                        optItem: item,
                      });
                      return !disabled;
                    })
                    .map((item: string) => {
                      return (
                        <Button
                          loading={loading || sendEnvoyLoading}
                          className={item}
                          key={item}
                          onClick={() => setStatus(item)}
                        >
                          {formatMessageApi({
                            Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item}`,
                          })}
                        </Button>
                      );
                    })
                    .value()}
                  {isDraftReason(status) && sendControl && (
                    <Button
                      loading={loading || sendEnvoyLoading}
                      className="Send"
                      disabled={notSendEnvoy({
                        globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.SEND),
                        selfAuth: lodash.get(envoyAuth, ESelfAuthCode.SEND),
                        envoyData: reasonGroup,
                      })}
                      onClick={sendEnvoy.bind(null, EnvoyButtonType.SEND)}
                    >
                      <Icon className="sendIcon" component={SendIcon} />
                      {formatMessageApi({
                        Label_Sider_Envoy: 'Send',
                      })}
                    </Button>
                  )}
                </div>
              )}
            </div>
            {lodash.map(reasonDetails, (reason: any) => (
              <CurrentReason
                currentReason={reason}
                groupIdx={groupIdx}
                isExpand={true}
                key={reason.id}
              />
            ))}
          </div>
        )}
      </div>
    );
  }, [reasonConfigs, reasonGroup, groupIdx, loading, initLoading, sendEnvoyLoading]);
};

export default connect(({ authController, envoyController }: any) => ({
  authEnvoy: authController,
  ...lodash.pick(envoyController, ['reasonConfigs', 'activedGroupKey', 'historyGroupKey']),
}))(CurrentReasonGroup);
