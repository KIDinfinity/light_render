import lodash from 'lodash';
import { queryCaseNo } from '@/services/navigatorCaseManagementControllerService';

export default async (claimNo: any) => {
  const response = await queryCaseNo({
    businessNo: claimNo,
    businessType: 'claim',
  });
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isString(response.resultData) &&
    !lodash.isEmpty(response.resultData)
  ) {
    return response.resultData;
  }
  return null;
};
