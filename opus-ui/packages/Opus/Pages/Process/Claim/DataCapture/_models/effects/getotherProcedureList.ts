import { getApprovalProcedureKjCodeForPage } from '@/services/claimJpPlanStandardControllerService';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';

export default function* getotherProcedureList({ payload }: any, { call, put }: any) {
  const { currentPage, pageSize } = lodash.pick(payload, ['currentPage', 'pageSize']);
  const response = yield call(getApprovalProcedureKjCodeForPage, {
    currentPage: currentPage,
    pageSize,
    params: {
      ...payload,
      regionCode: tenant.region(),
      searchKJCode: 'M%',
    },
  });

  if (
    response?.success &&
    lodash.isPlainObject(response?.resultData) &&
    lodash.isArray(response?.resultData?.rows)
  ) {
    yield put({
      type: 'otherProcedureModalUpdate',
      payload: {
        searchList: response.resultData.rows,
        total: response.resultData.total,
      },
    });
  }
}
