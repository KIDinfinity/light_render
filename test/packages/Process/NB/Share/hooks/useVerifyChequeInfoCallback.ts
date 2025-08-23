import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { Action } from '@/components/AuditLog/Enum';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import useGetChequeInfoList from 'process/NB/Share/hooks/useGetChequeInfoList';
import useGetChequeNo from 'process/NB/Share/hooks/useGetChequeNo';
import useGetPaymentOption from './useGetPaymentOption';
import useRefreshChequeInfoCallback from 'process/NB/Share/hooks/useRefreshChequeInfoCallback';
import usePublishEnvoyRefresh from '@mc/hooks/usePublishEnvoyRefresh';
import bpm from 'bpm/pages/OWBEntrance';
import { LS, LSKey } from '@/utils/cache';

export default (callback: Function) => {
  const NAMESPACE = useGetNamespace();
  const dispatch = useDispatch();
  const chequeInfoList = useGetChequeInfoList();
  const handleRefresh = useRefreshChequeInfoCallback();
  const chequeNo = useGetChequeNo();
  const paymentOption = useGetPaymentOption();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const handleReloadEnvoy = usePublishEnvoyRefresh();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  return useCallback(async () => {
    const assignee = (() => {
      const user = LS.getItem(LSKey.CURRENTUSER);
      return user?.userId;
    })();
    const {
      businessNo: applicationNo,
      caseNo,
      taskId,
      inquiryBusinessNo,
      taskDefKey,
    } = lodash.pick(taskDetail, [
      'businessNo',
      'caseNo',
      'taskId',
      'inquiryBusinessNo',
      'taskDefKey',
    ]);
    const payType = lodash.get(businessData, 'policyList[0].payType');
    dispatch({
      type: 'auditLogController/logButton',
      payload: {
        action: Action.Verify,
      },
    });
    const response: any = await dispatch({
      type: `${NAMESPACE}/verifyChequeInfo`,
      payload: {
        chequeInfoList,
        applicationNo,
        caseNo,
        taskId,
        assignee,
        chequeNo,
        paymentOption,
        payType,
        inquiryBusinessNo,
        taskDefKey,
      },
    });

    const { success } = lodash.pick(response, ['success']);
    if (success) {
      lodash.isFunction(callback) && callback();
      bpm.reload();
      handleReloadEnvoy();
    }
    handleRefresh({ businessData });
  }, [
    dispatch,
    chequeInfoList,
    taskDetail,
    chequeNo,
    handleRefresh,
    businessData,
    paymentOption,
    callback,
    handleReloadEnvoy,
  ]);
};
