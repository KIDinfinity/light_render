import React, { memo, useEffect, useState, useMemo, useCallback, useContext } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import { ReactComponent as AddIcon } from 'bpm/assets/add.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, EnvoyRequestType } from 'bpm/pages/Envoy/enum';
import { notAddEnvoy } from 'bpm/pages/Envoy/_utils/getDisabled';
import CurrentReasonGroup from 'bpm/pages/Envoy/EnvoyList/CurrentReasonGroup/CurrentReasonGroup';
import Count from '@/components/Count';
import styles from './envoyList.less';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';
import CaseTaskDetailContext from 'navigator/components/CaseTaskDetail/Pending/Context.ts';

const EnvoyList = (props) => {
  const {
    dispatch,
    authEnvoy,
    taskStatus,
    currentReasonGroups = [],
    reasonConfigs,
    taskDetail,
    requestType,
  } = props;
  const { enableGetDetial, localTaskId } = useContext(CaseTaskDetailContext);

  const isPending = useMemo(() => {
    return requestType === EnvoyRequestType.pending;
  }, [requestType]);
  const requestTypeList = useMemo(() => {
    return isPending ? ['Pending', 'Sub-process', 'Support'] : ['Notice'];
  }, [isPending]);

  const [isShowAdd, setShowAdd] = useState(false);

  const currentAuthority = 'RS_BP_Button_Envoy_AddPendRecord';

  useEffect(() => {
    if (reasonConfigs.length) {
      setShowAdd(true);
    } else {
      setShowAdd(false);
    }
  }, [reasonConfigs]);

  //输入caseNo没找到对应case不能添加
  const caseNoJudge = useMemo(() => {
    return !(enableGetDetial === true && !localTaskId);
  }, [enableGetDetial, localTaskId]);

  const addEnvoy = useCallback(() => {
    dispatch({
      type: 'envoyController/addEnvoy',
      payload: {
        requestType: requestTypeList[0],
      },
    });
    dispatch({
      type: 'envoyController/setActivedGroupKey',
      payload: {
        activedGroupKey: 0,
      },
    });
    dispatch({
      type: 'envoyController/saveViewReasonInfo',
      payload: {
        viewReasonInfo: {
          isCurrentList: true,
          groupIdx: 0,
          idx: 0,
          type: 'reason',
        },
      },
    });
  }, [requestTypeList, dispatch]);

  const showList = useMemo(() => {
    return (
      lodash
        .chain(currentReasonGroups)
        .filter(
          (el: any) =>
            lodash.includes(requestTypeList, el?.reasonDetails?.[0]?.type) && el.isVisible !== 'N'
        )
        .value() || []
    );
  }, [currentReasonGroups, requestTypeList]);

  const reasonConfigsFilterRequestTypes = useMemo(() => {
    return lodash.filter(reasonConfigs, (item) => {
      return lodash.includes(requestTypeList, item?.reasonConfigs?.[0]?.type);
    });
  }, [reasonConfigs, requestTypeList]);

  const renderUI = useMemo(() => {
    return (
      <div>
        {lodash.size(reasonConfigsFilterRequestTypes) || !lodash.isEmpty(showList) ? (
          <Card
            className={classNames(styles.envoyList, {
              letter: !isPending,
              current: isPending,
            })}
            title={
              <Count
                title={
                  isPending
                    ? formatMessageApi({
                        Label_Sider_Envoy: 'PendingRequest',
                      })
                    : formatMessageApi({
                        Label_Sider_Envoy: 'NonPendingRequest',
                      })
                }
                loading={false}
                length={showList.length}
              />
            }
            bordered={false}
            extra={
              caseNoJudge &&
              isShowAdd &&
              !notAddEnvoy({
                taskStatus,
                globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
              }) && (
                <AuthorizedAtom
                  currentAuthority={currentAuthority}
                  key="RS_BP_Button_Envoy_AddPendRecord"
                >
                  <Button className={styles.btnAddEnvoy} size="small" onClick={addEnvoy}>
                    <Icon className="addIcon" component={AddIcon} />
                  </Button>
                </AuthorizedAtom>
              )
            }
          >
            {lodash.map(showList, (reasonGroup: any) => {
              const groupIdx = currentReasonGroups.indexOf(reasonGroup);
              const reasonId = reasonGroup?.id || groupIdx;

              return (
                <CurrentReasonGroup
                  taskDetail={taskDetail}
                  reasonGroup={reasonGroup}
                  groupIdx={groupIdx}
                  isCurrentList
                  key={`reasonGroup_${reasonId}`}
                  requestTypeList={requestTypeList}
                />
              );
            })}
          </Card>
        ) : (
          <></>
        )}
      </div>
    );
  }, [
    isShowAdd,
    reasonConfigsFilterRequestTypes,
    showList,
    addEnvoy,
    authEnvoy,
    isPending,
    requestTypeList,
    taskDetail,
    taskStatus,
    caseNoJudge,
  ]);

  return renderUI;
};

export default connect(({ authController, envoyController }: any) => ({
  authEnvoy: authController,
  caseNo: envoyController?.caseNo,
  taskStatus: envoyController?.taskStatus,
  activedGroupKey: envoyController?.activedGroupKey,
  currentReasonGroups: envoyController?.currentReasonGroups,
  reasonConfigs: envoyController?.reasonConfigs,
}))(memo(EnvoyList));
