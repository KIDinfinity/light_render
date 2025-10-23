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

export default ({ children }: any) => {
  const [processInstanceId, setProcessInstanceId] = useState(null);
  const [caseDetail, setCaseDetail] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [taskDetail, setTaskDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const signal = useAbortController([taskId, flag]);
  const [dataSoure, setDataSource] = useState('');
  const [overdueTime, setOverdueTime] = useState(null);

  useReadPrepareData({ taskDetail });
  const handleChangePriority = useHandleChangeDataPiorityCallback();
  useEffect(() => {
    (async () => {
      if (taskId) {
        // setLoading(true);
        const aliasTaskDetail = await remoteGetTaskDetail({ taskId, processInstanceId }, signal);
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
  }, [signal, taskId]);

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
            remoteGetTaskId(aliasProcessInstanceId).then((resTaskId) => {
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
    return {
      processInstanceId,
      setProcessInstanceId,
      caseDetail,
      setCaseDetail: (newCaseDetail: any) => {
        setCaseDetail(newCaseDetail);
        (window as any).taskDetail = {
          ...newCaseDetail,
          companyCode: newCaseDetail?.companyCode || '2',
        };
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

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
