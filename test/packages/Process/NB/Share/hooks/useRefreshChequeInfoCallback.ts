import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import useGetPaymentOption from './useGetPaymentOption';
import { LS, LSKey } from '@/utils/cache';
import lodash from 'lodash';
import { Validator } from 'jsonschema';
import PayType from 'process/NB/Enum/PayType';
import usePublishEnvoyRefresh from '@mc/hooks/usePublishEnvoyRefresh';
const validator = new Validator();

export default () => {
  const NAMESPACE = useGetNamespace();
  const paymentOption = useGetPaymentOption();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const handleRefreshEnvoy = usePublishEnvoyRefresh();
  const dispatch = useDispatch();
  return useCallback(
    async ({ businessData, forceRefresh }) => {
      const assignee = (() => {
        const user = LS.getItem(LSKey.CURRENTUSER);
        return user?.userId;
      })();
      const chequeNo = (() => {
        return lodash
          .chain(businessData)
          .get('policyList[0].chequeInfoList', [])
          .first()
          .get('chequeNo')
          .value();
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
      const schema = {
        id: 'refresh-schema',
        type: 'object',
        properties: {
          assignee: {
            type: 'string',
          },
          application: {
            type: 'string',
          },
          caseNo: {
            type: 'string',
          },
          taskId: {
            type: 'string',
          },
          chequeNo: {
            type: 'string',
          },
        },
        required: ['applicationNo', 'caseNo', 'taskId', 'assignee', 'chequeNo'],
      };
      const params = {
        assignee,
        applicationNo,
        caseNo,
        taskId,
        chequeNo,
        paymentOption,
        forceRefresh,
        inquiryBusinessNo,
        activityKey: taskDefKey,
      };

      const payType = lodash.get(businessData, 'policyList[0].payType');
      const validateResult = validator.validate(params, schema);
      if (validateResult.valid) {
        if (payType === PayType.Cheque || payType === PayType.DirectTransfer) {
          await dispatch({
            type: `${NAMESPACE}/loadChequeInfoList`,
            payload: {
              ...params,
              payType,
              NAMESPACE,
            },
          });
          handleRefreshEnvoy();
        }
      }
    },
    [dispatch, taskDetail, NAMESPACE, paymentOption, handleRefreshEnvoy]
  );
};
