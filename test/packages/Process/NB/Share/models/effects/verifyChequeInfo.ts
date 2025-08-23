import { verify } from '@/services/owbNbChequeInfoControllerService';
import lodash from 'lodash';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }: any, { call, put }: any) {
  const {
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
  } = lodash.pick(payload, [
    'applicationNo',
    'caseNo',
    'taskId',
    'chequeInfoList',
    'assignee',
    'chequeNo',
    'paymentOption',
    'payType',
    'inquiryBusinessNo',
    'taskDefKey',
  ]);

  const response = yield call(verify, {
    chequeInfoList: formUtils.cleanValidateData(chequeInfoList),
    applicationNo,
    caseNo,
    taskId,
    assignee,
    chequeNo,
    paymentOption,
    payType,
    operationType: 'premium.settlement.cheque.verify',
  });
  const { success } = lodash.pick(response, ['success']);

  if (success) {
    yield put({
      type: 'setChequeEditStatus',
      payload: {
        chequeEditStatus: ChequeEditStatus.Verified,
      },
    });
  }

  return response;
}
