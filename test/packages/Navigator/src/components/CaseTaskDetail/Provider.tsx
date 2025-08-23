import React, { useState, useEffect, useCallback, useMemo } from 'react';
import lodash from 'lodash';
import useAbortController from '@/components/AbortController/useAbortController';
import remoteGetTaskDetail from './remoteGetTaskDetail';
import remoteGetTaskId from './remoteGetTaskId';
import remoteGetCaseNo from './remoteGetCaseNo';
import { useReadPrepareData } from '@/components/SolutionRead/Hooks';
import Context from './Context';
import { unstable_batchedUpdates } from 'react-dom';
import CaseCategory from 'enum/CaseCategory';
import useHandleChangeDataPiorityCallback from 'basic/components/DataPriorityContainer/hooks/useHandleChangeDataPiorityCallback';
import DataPriority from 'enum/DataPriority';
import useJudgeChecklistCanUse from '@/_hooks/useJudgeChecklistCanUse';
import { useDispatch, useSelector } from 'dva';

export default ({ children }: any) => {
  const dispatch = useDispatch();
  const [processInstanceId, setProcessInstanceId] = useState(null);
  const [caseDetail, setCaseDetail] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [taskDetail, setTaskDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [dataSoure, setDataSource] = useState('');
  const [overdueTime, setOverdueTime] = useState(null);
  const checklistOpen = useJudgeChecklistCanUse();

  useReadPrepareData({ taskDetail });
  const handleChangePriority = useHandleChangeDataPiorityCallback();
  const reAssignee = useSelector((state: any) => state.contactsAssigneeList.reAssign)?.[taskId];
  const isReAssignee = !!reAssignee && taskDetail?.assignee !== reAssignee;
  const signal = useAbortController([taskId, flag]);

  useEffect(() => {
    (async () => {
      if (taskId) {
        // setLoading(true);
        const aliasTaskDetail = await remoteGetTaskDetail({ taskId, processInstanceId }, signal);
        dispatch({
          type: 'workspaceSwitchOn/saveRemoteTaskDetail',
          payload: {
            taskDetail: aliasTaskDetail,
          },
        });
        if (aliasTaskDetail) {
          (() => {
            unstable_batchedUpdates(() => {
              setTaskDetail(aliasTaskDetail);
              setProcessInstanceId(aliasTaskDetail?.processInstanceId);
            });

            if (aliasTaskDetail.caseCategory) {
              if (
                [
                  CaseCategory.VN_UW_CTG001,
                  CaseCategory.BP_NB_CTG001,
                  CaseCategory.BP_NB_CTG002,
                  CaseCategory.BP_NB_CTG003,
                  CaseCategory.BP_NB_CTG005,
                  CaseCategory.BP_AP_CTG02,
                  CaseCategory.BP_AP_CTG03,
                  CaseCategory.NB_UW_CTG001,
                  CaseCategory.NB_UW_CTG006,
                  CaseCategory.NB_UW_CTG005,
                  // CaseCategory.BP_PAPER_CTG003,
                ].includes(aliasTaskDetail.caseCategory)
              ) {
                if (/claim\/task\/detail\//.test(window.location.pathname)) {
                  handleChangePriority(DataPriority.HIGH);
                  return false;
                }
              }
              handleChangePriority(DataPriority.MEDIUM);
            }
          })();

          // setLoading(false);
        } else {
          setTaskDetail(null);
        }
      }
    })();
  }, [signal]);

  useEffect(() => {
    const fn = async () => {
      const aliasTaskDetail = await remoteGetTaskDetail({ taskId, processInstanceId }, signal);
      setTaskDetail(aliasTaskDetail);
    };
    if (isReAssignee) {
      fn();
    }
  }, [isReAssignee]);

  const getTaskDetail = useCallback(
    async ({
      taskId: aliasTaskId,
      processInstanceId: aliasProcessInstanceId,
      claimNo: aliasClaimNo,
    }: any) => {
      if (aliasTaskId || aliasProcessInstanceId) {
        unstable_batchedUpdates(() => {
          if (aliasTaskId) {
            setDataSource('TASK');
            setProcessInstanceId(aliasProcessInstanceId);
            setTaskId(aliasTaskId);
          } else if (aliasProcessInstanceId) {
            setDataSource('CASE');
            setProcessInstanceId(aliasProcessInstanceId);
            remoteGetTaskId(aliasProcessInstanceId, dispatch).then((resTaskId) => {
              setTaskId(resTaskId);
              if (lodash.isEmpty(resTaskId)) {
                setTaskDetail(null);
              }
            });
          }
        });
      } else if (aliasClaimNo) {
        const resCaseNo = await remoteGetCaseNo(aliasClaimNo);
        unstable_batchedUpdates(() => {
          setDataSource('CLAIM');
          setProcessInstanceId(resCaseNo);
        });
        const resTaskId = await remoteGetTaskId(resCaseNo);
        setTaskId(resTaskId);
      }
    },
    []
  );

  const contextValue = useMemo(() => {
    window.history.replaceState(taskDetail, '');
    return {
      processInstanceId,
      setProcessInstanceId,
      caseDetail,
      setCaseDetail: (newCaseDetail: any) => {
        setCaseDetail(newCaseDetail);
        (window as any).taskDetail = newCaseDetail;
      },

      taskId,
      setTaskId,
      taskDetail,
      setTaskDetail,

      getTaskDetail,

      loading,
      dataSoure,
      setDataSource,
      overdueTime,
      setOverdueTime,
      reload: (reloadTaskId?: any) => {
        if (reloadTaskId && reloadTaskId !== taskId) {
          setTaskId(reloadTaskId);
        } else {
          setFlag(!flag);
        }
      },
    };
  }, [processInstanceId, caseDetail, taskId, taskDetail, loading, dataSoure, overdueTime, flag]);

  useEffect(() => {
    // 没有case数据不跑
    if(!caseDetail?.caseNo)
      return;
    // 有case和task数据，但两边businessNo不一致不跑，因为task数据可能不同步（切换case时，先更新case再更新task），需要判断businessNo相同了再走getIntegrationChecklist
    if(caseDetail.businessNo !== taskDetail?.businessNo) {
      // 进到这里情况有三种：
      // 1、case显示有task（currentTaskId不为空），有task数据，且task和case的businessNo不一致，说明数据不同步，要跳过
      // 2、case显示无task，有task数据，说明不同步，要跳过
      // 3、case显示无task，无task数据，说明数据是同步的（businessNo不一致是因为没task数据），不能跳过（虽然从一个没有task的case跳到另一个没有task的case也会在刚更新case时命中这一条，但这种情况下反正后续也不会再去更新task数据了，所以也可以视为同步）
      // 这个判断是直接判断是否符合第三种情况，如果不是第三种，就直接跳过
      if(taskDetail || caseDetail.currentTaskId)
        return;
    }
    if (checklistOpen) {
      dispatch({
        type: 'integration/getIntegrationChecklist',
        payload: {
          businessNo: caseDetail?.businessNo,
          caseNo: caseDetail?.procInstId,
          caseCategory: caseDetail?.caseCategory,
          taskDefKey: taskDetail?.taskDefKey,
        },
      });
    }
  }, [taskDetail, checklistOpen, caseDetail]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
