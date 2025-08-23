import lodash from 'lodash';
import { checkDocStatus } from '@/services/docManagementControllerService';

export default function* (_: any, { call, select }: any) {
  const caseInfo = yield select(({ documentManagement }: any) => documentManagement.caseInfo);
  const { businessNo, caseCategory, caseNo, parentBusinessNo, policyNo } = lodash.pick(caseInfo, [
    'businessNo',
    'caseCategory',
    'caseNo',
    'parentBusinessNo',
    'policyNo',
  ]);
  const response = yield call(checkDocStatus, {
    businessNo,
    caseCategory,
    caseNo,
    parentBusinessNo,
    policyNo,
  });
  return response;
}
