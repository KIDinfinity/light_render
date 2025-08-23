import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';

import Context from './Context';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import useLoading from 'basic/hooks/useLoading';
import type CaseCategory from 'enum/CaseCategory';
import type TaskDefKey from 'enum/TaskDefKey';
import type TaskStatus from 'enum/TaskStatus';

interface IParams {
  caseNo?: string;
  taskId?: string;
  processInstanceId?: string;
}

interface IProcessInfo {
  caseCategory?: typeof CaseCategory;
  taskDefKey?: typeof TaskDefKey;
  activityCode?: typeof TaskDefKey;
  activityKey?: typeof TaskDefKey;
  businessNo?: string;
  caseNo?: string;
  taskId?: string;
  taskStatus: TaskStatus;
}

interface IHistoryState extends IProcessInfo {
  companyCode?: string | null;
}

const Provider = Context.Provider;

let prevAbortController: any = null;

const getDefaultActivityCode = (caseCategory) => {
  switch (caseCategory) {
    case 'BP_AP_CTG02':
      return 'BP_AP_ACT003';
    case 'BP_NB_CTG001':
    case 'BP_NB_CTG005':
      return 'BP_NB_ACT004';
    default:
      return 'BP_NB_ACT004';
  }
};

export default ({ children }: any) => {
  const params: IParams = useParams();
  const [caseDetail, setCaseDetail] = useState({});
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();
      if (prevAbortController) {
        prevAbortController.abort();
      }
      prevAbortController = abortController;
      const { taskId, caseNo, processInstanceId } = lodash.pick(params, [
        'taskId',
        'caseNo',
        'processInstanceId',
      ]);
      const processInfo: IProcessInfo = await (async () => {
        // setLoading(true);
        if (taskId) {
          const response = await getTask(
            objectToFormData({
              taskId,
            }),
            {
              signal: abortController.signal,
            }
          );
          if (response?.success) {
            const data = lodash.pick(response?.resultData, [
              'caseCategory',
              'taskDefKey',
              'businessNo',
              'inquiryBusinessNo',
              'taskId',
              'processInstanceId',
              'taskStatus',
              'companyCode',
            ]);
            return {
              ...data,
              activityCode: data?.taskDefKey,
              activityKey: data?.taskDefKey,
              caseNo: data?.processInstanceId,
            };
          }
        }
        if (caseNo || processInstanceId) {
          const response = await findBizProcess(
            { processInstanceId: caseNo || processInstanceId },
            {
              signal: abortController.signal,
            }
          );

          if (response?.success) {
            const data = lodash.pick(response?.resultData, [
              'currentActivityKey',
              'caseCategory',
              'businessNo',
              'caseNo',
              'currentTaskId',
              'status',
              'companyCode',
            ]);

            const defaultActivityKey = getDefaultActivityCode(data?.caseCategory);

            const currentActivityKey = data?.currentActivityKey || defaultActivityKey;
            return {
              // caseCategory: 'BP_AP_CTG02',
              caseCategory: data?.caseCategory,
              taskDefKey: currentActivityKey,
              activityCode: currentActivityKey,
              activityKey: currentActivityKey,
              businessNo: data?.businessNo,
              caseNo: data?.caseNo,
              // 这里有坑 currentTaskId 不是一定有的
              taskId: data?.currentTaskId,
              taskStatus: data?.status,
              companyCode: data?.companyCode,
            };
          }
        }
        return {};
      })();
      const historyState: IHistoryState = { ...processInfo };
      window.history.replaceState(historyState, '');
      setCaseDetail({
        ...processInfo,
      });
      // 为了获取数据字典的时候通过节点去过滤
      (window as any).taskDetail = processInfo;
      // setLoading(false);
    })();
    return () => {
      setCaseDetail({});
    };
  }, [params]);
  return <Provider value={{ caseDetail }}>{!loading && children}</Provider>;
};
