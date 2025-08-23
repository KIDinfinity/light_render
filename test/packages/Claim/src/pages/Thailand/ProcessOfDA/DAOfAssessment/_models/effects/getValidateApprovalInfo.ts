import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { validateApprovalInfo } from '@/services/navigatorCaseOperationControllerService';

export default function* getValidateApprovalInfo({ }: any, { call, put, select }: any) {
  const caseNo = yield select(
    (state: any) => state?.processTask?.getTask?.caseNo
  );

  const response = yield call(validateApprovalInfo, objectToFormData({
    caseNo,
  }));

  return lodash.get(response, 'resultData.MessageCode');
}
