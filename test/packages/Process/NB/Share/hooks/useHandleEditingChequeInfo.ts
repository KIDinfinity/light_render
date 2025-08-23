import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import { LS, LSKey } from '@/utils/cache';
import useGetChequeNo from 'process/NB/Share/hooks/useGetChequeNo';
import useGetPaymentOption from './useGetPaymentOption';
import useRefreshChequeInfoCallback from 'process/NB/Share/hooks/useRefreshChequeInfoCallback';

export default () => {
  const dispatch = useDispatch();
  const NAMESPACE = useGetNamespace();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const chequeNo = useGetChequeNo();
  const paymentOption = useGetPaymentOption();
  const handleRefresh = useRefreshChequeInfoCallback();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const payType = lodash.get(businessData, 'policyList[0].payType');

  return useCallback(async () => {
    const assignee = (() => {
      const user = LS.getItem(LSKey.CURRENTUSER);
      return user?.userId;
    })();
    const { businessNo: applicationNo, caseNo, taskId } = lodash.pick(taskDetail, [
      'businessNo',
      'caseNo',
      'taskId',
    ]);
    const response = await dispatch({
      type: `${NAMESPACE}/editChequeInfo`,
      payload: {
        applicationNo,
        caseNo,
        taskId,
        assignee,
        chequeNo,
        paymentOption,
        payType,
      },
    });
    if (!response?.success) {
      handleRefresh({ businessData });
    }
  }, [dispatch, taskDetail, chequeNo, handleRefresh, businessData, paymentOption]);
};
