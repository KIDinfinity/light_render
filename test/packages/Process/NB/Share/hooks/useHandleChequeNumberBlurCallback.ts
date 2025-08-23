import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { get } from '@/services/owbNbChequeInfoControllerService';
import lodash from 'lodash';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import useGetChequeInfoList from 'process/NB/Share/hooks/useGetChequeInfoList';

export default () => {
  const dispatch = useDispatch();

  const NAMESPACE = useGetNamespace();
  const chequeInfoList = useGetChequeInfoList();
  const {
    assignee,
    businessNo: applicationNo,
    caseNo,
    taskId,
    inquiryBusinessNo,
    taskDefKey: activityKey,
  } = useSelector(({ processTask }: any) => processTask.getTask);
  return useCallback(
    async (e: any) => {
      const chequeNo = e?.target?.value;
      if (!!chequeNo) {
        const params = {
          assignee,
          applicationNo,
          caseNo,
          taskId,
          inquiryBusinessNo,
          activityKey,
        };
        const response = await get({
          ...params,
          chequeNo,
          chequeInfoList: formUtils.cleanValidateData(chequeInfoList),
        });
        if (response?.success) {
          const { chequeInfoList: newList } = lodash.pick(response?.resultData, ['chequeInfoList']);
          dispatch({
            type: `${NAMESPACE}/setChequeInfoList`,
            payload: {
              chequeInfoList: newList,
            },
          });
        }
      }
    },
    [
      dispatch,
      chequeInfoList,
      assignee,
      applicationNo,
      caseNo,
      taskId,
      inquiryBusinessNo,
      activityKey,
    ]
  );
};
