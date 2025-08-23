import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'dva';
import { Collapse, Button, Icon, notification } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import lodash from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as SendIcon } from 'bpm/assets/sent.svg';
import bpm from 'bpm/pages/OWBEntrance';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import CurrentReason from 'bpm/pages/Envoy/EnvoyList/CurrentReason/CurrentReason';
import Reminder from 'bpm/pages/Envoy/EnvoyList/Reminder/Reminder';
import Retry from 'bpm/pages/Envoy/EnvoyList/Retry';
import CurrentReasonHeader from 'bpm/pages/Envoy/EnvoyList/CurrentReasonHeader/CurrentReasonHeader';
import GroupSelect from 'bpm/pages/Envoy/EnvoyList/CurrentReasonGroup/GroupSelect';
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
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';
import HospitalLettle from './HospitalLettle';
import useExpanderController from 'navigator/hooks/useExpanderController';
import hasExpandModule from '../../_utils/hasExpandModule';

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
    authEnvoy,
    reasonConfigs,
    activedGroupKey,
    historyGroupKey,
    reasonGroup,
    groupIdx,
    isCurrentList,
    taskDetail,
    requestTypeList,
  } = props;
  const {
    envoyAuth,
    status,
    allowActions,
    reasonDetails,
    groupCode,
    hasExtraFuncFail,
    handledReason,
  } = lodash.pick(reasonGroup, [
    'envoyAuth',
    'status',
    'allowActions',
    'reasonDetails',
    'groupCode',
    'hasExtraFuncFail',
    'handledReason',
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
  const triggerActiveTab = useSelector((state) => state.workspaceSwitchOn.triggerActiveTab);

  const [saveLoading, setSaveLoading] = useState(false);
  const [waiveLoading, setWaiveLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const previewModeShow = useSelector(
    ({ envoyController }: any) => envoyController.previewModeShow,
    shallowEqual
  );
  useEffect(() => {
    if (!previewModeShow) {
      setSendLoading(false);
    }
  }, [previewModeShow, setSendLoading]);
  const readData =
    useSelector(({ solutionRead }: any) => solutionRead?.readData, shallowEqual) || {};

  // ctnType: reason | reminder
  const [ctnType, setCtnType] = useState('reason');
  const [collapseIdx, setCollapseIdx] = useState(0);
  const [hasExtraFuncFailState, setHasExtraFuncFailState] = useState(hasExtraFuncFail);

  useEffect(() => {
    setHasExtraFuncFailState(hasExtraFuncFail);
  }, [hasExtraFuncFail]);

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
  const delReasonGroup = () => {
    dispatch({
      type: 'envoyController/delEnvoy',
      payload: {
        groupIdx,
      },
    });
  };
  const handlerEnvoySended = usePublishEnvoyChange();
  const setStatus = async (key): void => {
    if (key === EnvoyButtonType.SAVE) {
      setSaveLoading(true);
    }
    if (key === EnvoyButtonType.WAIVE) {
      setWaiveLoading(true);
    }
    await bpm.buttonAction('save', { syncData: true });
    const resultData = await dispatch({
      type: 'envoyController/setStatus',
      payload: {
        groupIdx,
        status: key,
        taskDetail,
      },
    });
    setSaveLoading(false);
    setWaiveLoading(false);
    handlerEnvoySended(resultData);
  };
  let autoSaveTime: any = null;
  useEffect(() => {
    const disabled = notSetResolve({
      globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      envoyData: reasonDetails,
      status,
      optItem: 'Save',
    });

    if (!autoSaveTime && isCurrentList && isActivedGroup && !sendEnvoyLoading && !disabled) {
      autoSaveTime = setInterval(() => {
        if (status !== 'Active') {
          setSaveLoading(true);
          dispatch({
            type: 'envoyController/setStatus',
            payload: {
              groupIdx,
              status: 'Save',
              isAuto: true,
              taskDetail,
            },
          });
          setSaveLoading(false);
        }
      }, 30 * 1000);
    }
    return () => {
      if (autoSaveTime) {
        clearInterval(autoSaveTime);
      }
    };
  }, [isCurrentList, isActivedGroup, status, sendEnvoyLoading]);

  useEffect(() => {
    if (triggerActiveTab && reasonGroup.id === triggerActiveTab) {
      setActivedKey(0, 'reason');
      dispatch({
        type: 'workspaceSwitchOn/saveTriggerActiveTab',
        payload: {
          triggerActiveTab: '',
        },
      });
    }
  }, [triggerActiveTab, reasonGroup.id]);

  const sendEnvoy = async (type, ev) => {
    ev.stopPropagation();
    if (type === EnvoyButtonType.SEND) {
      setSendLoading(true);
    }

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
    if (hasError) {
      setSendLoading(false);
    }
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
      if (!resolveData?.result) {
        setSendLoading(false);
        return;
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

      setSendLoading(false);
    }
  };

  const sendControl = lodash.get(reasonGroup, 'sendControl');

  const showUnRead: boolean = lodash
    .chain(reasonDetails?.[0]?.pendingMemoList || [])
    .reduce((isShow: boolean, el: any) => {
      return el.readFlag === 'Y' && !lodash.includes(readData[ESubjectType.ENVOYMEMO], el.id)
        ? true
        : isShow;
    }, false)
    .value();

  const { isExpanderSwitchOn } = useExpanderController();
  const hideReason = isExpanderSwitchOn && hasExpandModule(reasonGroup);

  const statusForDisplay = handledReason
    ? formatMessageApi({
        Label_Sider_Envoy: handledReason,
      })
    : status
      ? formatMessageApi({
          Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${status}`,
        })
      : null;
  return useMemo(() => {
    return (
      <div className={styles.currentReasonGroup}>
        {(!status || status === EReasonStatus.DRAFT) && (
          <Button
            className={styles.del}
            icon="close"
            size="small"
            type="link"
            onClick={delReasonGroup}
          />
        )}

        <Read
          callBack={() => {
            setActivedKey(0, 'reason');
          }}
          type={EType.ITEM}
          id={groupIdx}
          forbiClick
          show={showUnRead && !isActivedGroup}
        >
          <div
            className={classNames(styles.groupHeader, {
              [styles.active]: isActivedGroup,
              [styles.activeBg]: ctnType !== 'reason',
              [styles.error]: hasExtraFuncFailState,
            })}
            onClick={() => setActivedKey(0, 'reason')}
          >
            <GroupSelect
              reasonGroup={reasonGroup}
              groupIdx={groupIdx}
              requestTypeList={requestTypeList}
            />
            {statusForDisplay && <div className={styles.status}>{statusForDisplay}</div>}
          </div>
        </Read>

        {initLoading ? (
          <Icon type="loading" />
        ) : (
          <Collapse activeKey={collapseActiveKey()} bordered={false} onClick={stopPropagationFn}>
            {lodash.map(reasonDetails, (reason: any, reasonIdx: number) => (
              <Collapse.Panel
                key={`${keyPrefix}_${groupIdx}_${reasonIdx}`}
                header={
                  <CurrentReasonHeader
                    currentReason={reason}
                    reasonIdx={reasonIdx}
                    setActivedKey={setActivedKey}
                    collapseIdx={collapseIdx}
                    isOnlyReason={isOnlyReason}
                    isCurrentList={isCurrentList}
                    ctnType={ctnType}
                    status={status}
                    hasExtraFuncFailState={hasExtraFuncFailState}
                    isActivedGroup={isActivedGroup}
                  />
                }
                showArrow={false}
              >
                {ctnType === 'reason' ? (
                  !hideReason && (
                    <CurrentReason currentReason={reason} groupIdx={groupIdx} status={status} />
                  )
                ) : ctnType === 'reminder' ? (
                  <Reminder currentReason={reason} groupCode={groupCode} />
                ) : (
                  <Retry
                    groudId={reasonGroup?.id}
                    status={reasonGroup?.status}
                    setHasExtraFuncFailState={setHasExtraFuncFailState}
                  />
                )}
                <HospitalLettle reason={reason} />
              </Collapse.Panel>
            ))}
            <Collapse.Panel key={lastCollapsePanelIdx} showArrow={false}>
              {!hideReason && isCurrentList && ctnType !== 'retry' && (
                <div className={styles.btnGroup}>
                  {isDraftReason(status) &&
                    [EnovyPreviewMode.CANPREVIEW, EnovyPreviewMode.MUSTPREVIEW].includes(
                      currentReasonConfig?.previewMode
                    ) && (
                      <Button
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
                          loading={item == EnvoyButtonType.WAIVE ? waiveLoading : saveLoading}
                          className={item}
                          key={item}
                          onClick={() => setStatus(item)}
                        >
                          {!saveLoading && !waiveLoading
                            ? formatMessageApi({
                                Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item}`,
                              })
                            : (saveLoading && item === EnvoyButtonType.SAVE) ||
                                (waiveLoading && item === EnvoyButtonType.WAIVE)
                              ? ''
                              : formatMessageApi({
                                  Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item}`,
                                })}
                        </Button>
                      );
                    })
                    .value()}
                  {isDraftReason(status) && sendControl && (
                    <Button
                      loading={sendLoading || sendEnvoyLoading}
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
    hasExtraFuncFailState,
    hideReason,
    saveLoading,
    waiveLoading,
    sendLoading,
  ]);
};

export default connect(({ authController, envoyController }: any) => ({
  authEnvoy: authController,
  ...lodash.pick(envoyController, ['reasonConfigs', 'activedGroupKey', 'historyGroupKey']),
}))(CurrentReasonGroup);
