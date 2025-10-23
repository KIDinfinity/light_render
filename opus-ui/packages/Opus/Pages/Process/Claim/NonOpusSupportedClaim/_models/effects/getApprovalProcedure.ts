import lodash from 'lodash';
import { getApprovalProcedureKjCodeForPage } from '@/services/claimJpPlanStandardControllerService';

export default function* getApprovalProcedure({ payload }: any) {
  const { searchContent, type, extra = {} } = payload || {};

  const response = yield getApprovalProcedureKjCodeForPage({
    currentPage: 1,
    params: {
      pageSize: 20,
      current: 1,
      searchType: 3,
      dropdownCode: 'claim_dict001',
      searchContent,
      regionCode: 'JP',
    },
    pageSize: 10,
    ...extra,
  });

  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isArray(response?.resultData?.rows)
  ) {
    return response?.resultData?.rows;
  }

  return [];
}
