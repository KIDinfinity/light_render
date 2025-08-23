import React, { useState, useMemo } from 'react';
import { Collapse, Button, Icon, notification } from 'antd';
import { useSelector, connect } from 'dva';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import lodash from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as SendIcon } from 'bpm/assets/sent.svg';
import CurrentReason from 'bpm/pages/Envoy/EnvoyList/CurrentReason/CurrentReason';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import Reminder from 'bpm/pages/Envoy/EnvoyList/Reminder/Reminder';
import bpm from 'bpm/pages/OWBEntrance';
import usePublishEnvoyChange from '@mc/hooks/usePublishEnvoyChange';
import CurrentReasonHeaderSummary from 'bpm/pages/Envoy/EnvoyList/CurrentReasonHeaderSummary/CurrentReasonHeader';
import GroupSelect from 'bpm/pages/Envoy/EnvoyList/CurrentReasonGroup/GroupSelect';
import { isDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import { EnvoyButtonType, EnovyPreviewMode } from 'bpm/pages/Envoy/enum';
import { tarckInquiryPoint, eEventName } from '@/components/TarckPoint';
import styles from './currentReasonGroup.less';

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
  taskDetail: object;
  requestTypeList: string[];
}

const CurrentReasonGroup = (props: IProps) => {
  const {
    dispatch,
    reasonConfigs,
    activedGroupKey,
    historyGroupKey,
    reasonGroup,
    groupIdx,
    isCurrentList,
    requestTypeList,
  } = props;
  const { status, reasonDetails, groupCode } = lodash.pick(reasonGroup, [
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
  // ctnType: reason | reminder
  const [ctnType, setCtnType] = useState('reason');
  const [collapseIdx, setCollapseIdx] = useState(0);
  const lastCollapsePanelIdx = reasonDetails?.length;
  // 当只有一个子reason的时候，不显示reason的名
  const isOnlyReason = reasonDetails?.length === 1;
  // 先判断是currentGroups还是historyGroups，在判断是否是当前展开的组
  const activedKey = isCurrentList ? activedGroupKey : historyGroupKey;
  const isActivedGroup = groupIdx === activedKey;

  const keyPrefix = isCurrentList ? 'current' : 'history';
  const collapseActiveKey = () => {
    if (!isActivedGroup) {
      return null;
    }
    return [`${keyPrefix}_${activedKey}_${collapseIdx}`, lastCollapsePanelIdx];
  };
  const currentReasonConfig = lodash
    .chain(reasonConfigs)
    .pickBy(lodash.isObject as any)
    .find({ code: groupCode })
    .value();
  // idx：当前group里的第几个collapse，type：选择查看reason 或者 reminder
  const setActivedKey = async (idx: number, type: string): void => {
    const newActivedKey = isActivedGroup ? null : groupIdx;
    setCollapseIdx(idx);
    setCtnType(type);
    await dispatch({
      type: 'envoyController/saveViewReasonInfo',
      payload: {
        viewReasonInfo: {
          isCurrentList,
          groupIdx,
          idx,
          type,
        },
      },
    });

    if (isActivedGroup && (collapseIdx !== idx || ctnType !== type)) {
      return;
    }
    if (isCurrentList) {
      dispatch({
        type: 'envoyController/setActivedGroupKey',
        payload: {
          activedGroupKey: newActivedKey,
        },
      });
      dispatch({
        type: 'envoyController/validateFields',
      });
    } else {
      dispatch({
        type: 'envoyController/setHistoryGroupKey',
        payload: {
          historyGroupKey: newActivedKey,
        },
      });
    }
  };
  const stopPropagationFn = (ev: any): void => {
    ev.stopPropagation();
  };
  const sendControl = lodash.get(reasonGroup, 'sendControl');
  const handlerEnvoySended = usePublishEnvoyChange();
  const sendEnvoy = async (type, ev) => {
    ev.stopPropagation();
    // if (type === EnvoyButtonType.SEND) {
    //   setSendLoading(true);
    // }

    dispatch({
      type: 'envoyController/savePreviewCurrentReason',
      payload: {
        previewCurrentReason: reasonGroup,
      },
    });

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

  return useMemo(() => {
    return (
      <div className={styles.currentReasonGroup}>
        <div
          className={classNames(styles.groupHeader, {
            [styles.active]: isActivedGroup,
            [styles.activeBg]: ctnType !== 'reason',
          })}
          onClick={() => setActivedKey(0, 'reason')}
        >
          <GroupSelect
            reasonGroup={reasonGroup}
            groupIdx={groupIdx}
            requestTypeList={requestTypeList}
          />
          {status && (
            <div className={styles.status}>
              {formatMessageApi({
                Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${status}`,
              })}
            </div>
          )}
        </div>
        {initLoading ? (
          <Icon type="loading" />
        ) : (
          <Collapse activeKey={collapseActiveKey()} bordered={false} onClick={stopPropagationFn}>
            {lodash.map(reasonDetails, (reason: any, reasonIdx: number) => (
              <Collapse.Panel
                key={`${keyPrefix}_${groupIdx}_${reasonIdx}`}
                header={
                  <CurrentReasonHeaderSummary
                    currentReason={reason}
                    reasonIdx={reasonIdx}
                    setActivedKey={setActivedKey}
                    collapseIdx={collapseIdx}
                    isOnlyReason={isOnlyReason}
                    isCurrentList={isCurrentList}
                    ctnType={ctnType}
                  />
                }
                showArrow={false}
              >
                {ctnType === 'reason' ? (
                  <CurrentReason currentReason={reason} groupIdx={groupIdx} status={status} />
                ) : (
                  <Reminder currentReason={reason} groupCode={groupCode} />
                )}
              </Collapse.Panel>
            ))}
            <Collapse.Panel key={lastCollapsePanelIdx} showArrow={false}>
              {isCurrentList && (
                <div className={styles.btnGroup}>
                  {isDraftReason(status) &&
                    sendControl &&
                    [EnovyPreviewMode.CANPREVIEW, EnovyPreviewMode.MUSTPREVIEW].includes(
                      currentReasonConfig?.previewMode
                    ) && (
                      <Button
                        loading={loading || sendEnvoyLoading}
                        className="Send"
                        onClick={sendEnvoy.bind(null, EnvoyButtonType.PREVIEW)}
                      >
                        <Icon className="sendIcon" component={SendIcon} />
                        {formatMessageApi({
                          Label_Sider_Envoy: 'Preview',
                        })}
                      </Button>
                    )}
                </div>
              )}
            </Collapse.Panel>
          </Collapse>
        )}
      </div>
    );
  }, [
    reasonConfigs,
    reasonGroup,
    groupIdx,
    activedKey,
    collapseIdx,
    ctnType,
    loading,
    initLoading,
    sendEnvoyLoading,
    requestTypeList,
  ]);
};

export default connect(({ authController, envoyController }: any) => ({
  authEnvoy: authController,
  ...lodash.pick(envoyController, ['reasonConfigs', 'activedGroupKey', 'historyGroupKey']),
}))(CurrentReasonGroup);
