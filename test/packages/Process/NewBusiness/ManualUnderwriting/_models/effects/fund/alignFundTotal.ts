// align fund data by productList change
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import {
  getAllocationSum,
  getAllocationVisibleCondition,
  getValidatedTotalData,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Fund/utils';

export default function* (action: any, { put, select }: any) {
  // modalData fundList
  const FundInfoListPath = `${NAMESPACE}.modalData.fund.fundList`;
  // processData coverageList
  const CoverageListPath = `${NAMESPACE}.processData.coverageList`;

  const fundSectionConfig = lodash.get(action, 'payload.config');
  const coverageList = yield select((state: any) => lodash.get(state, CoverageListPath, []));
  const fundInfoList = yield select((state: any) => lodash.get(state, FundInfoListPath, {}));

  const visibleConditions = getAllocationVisibleCondition(
    coverageList,
    Object.values(fundInfoList),
    fundSectionConfig
  );
  const fundTotal = getAllocationSum(Object.values(fundInfoList), visibleConditions);
  const validateTotalFund = getValidatedTotalData(fundTotal);

  // set updateFundTotal
  yield put({
    type: 'saveFormData',
    target: 'updateFundTotal',
    payload: {
      changedFields: {
        ...validateTotalFund,
        id: 'fund_total_error',
      },
      errorId: 'fund_total_error',
    },
  });
}
