import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import logButton from '@/components/AuditLog/API/logButton';

import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import useGetChequeInfoList from 'process/NB/Share/hooks/useGetChequeInfoList';
import useGetChequeNo from 'process/NB/Share/hooks/useGetChequeNo';
import useGetPaymentOption from './useGetPaymentOption';
import { LS, LSKey } from '@/utils/cache';
import useRefreshChequeInfoCallback from 'process/NB/Share/hooks/useRefreshChequeInfoCallback';

export default () => {
  const NAMESPACE = useGetNamespace();
  const dispatch = useDispatch();
  const chequeInfoList = useGetChequeInfoList();
  const chequeNo = useGetChequeNo();
  const paymentOption = useGetPaymentOption();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const handleRefresh = useRefreshChequeInfoCallback();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
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
      const payType = lodash.get(businessData, 'policyList[0].payType');
      const response: any = await dispatch({
      type: `${NAMESPACE}/saveChequeInfo`,
      payload: {
        applicationNo,
        caseNo,
        taskId,
        chequeInfoList,
        assignee,
        chequeNo,
        paymentOption,
        payType,
      },
    });

    if (response?.success) {
      logButton({
        caseNo: taskDetail?.processInstanceId,
        buttonCode: 'save',
        isAuto: false,
        dispatch,
      });
    }
    if (!response?.success) {
      handleRefresh({ businessData });
    }
  }, [dispatch, chequeInfoList, taskDetail, chequeNo, businessData, handleRefresh, paymentOption]);
};
