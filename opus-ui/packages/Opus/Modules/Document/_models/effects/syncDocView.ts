import lodash from 'lodash';
import { syncDocView } from '@/services/docManagementControllerService';

export default function* (_: any, { call, select }: any) {
  const caseInfo = yield select(({ documentManagement }: any) => documentManagement.caseInfo);
  const { businessNo, caseCategory, caseNo, inquiryBusinessNo, policyNo } = lodash.pick(caseInfo, [
    'businessNo',
    'caseCategory',
    'caseNo',
    'inquiryBusinessNo',
    'policyNo',
  ]);
  const response = yield call(syncDocView, {
    businessNo,
    caseCategory,
    caseNo,
    parentBusinessNo: inquiryBusinessNo,
    policyNo,
  });
  return response;
}
