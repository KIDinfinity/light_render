// align fund data by productList change
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import {
  getAllocationVisibleCondition,
  getFundWithDefaultAllocations,
  getFundWithFundName,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Fund/utils';

export default function* (action: any, { put, select }: any) {
  // modal coverageList
  const CoverageListPath = `${NAMESPACE}.modalData.processData.coverageList`;
  // process fundList
  const FundListPath = `${NAMESPACE}.processData.fund.fundInfoList`;
  //process portfolioType
  const PortfolioTypePath = `${NAMESPACE}.processData.fund.fundBaseInfo.portfolioType`;
  // fundConfigList
  const FundConfigListModalDataPath = `${NAMESPACE}.modalData.fund.fundConfigList`;
  // productConfig
  const ProductCodeListModalDataPath = `${NAMESPACE}.modalData.fund.productCodeList`;

  const fundSectionConfig = lodash.get(action, 'payload.config');
  const coverageList = yield select((state: any) => lodash.get(state, CoverageListPath));
  const fundList = yield select((state: any) => lodash.get(state, FundListPath));
  const portfolioType = yield select((state: any) => lodash.get(state, PortfolioTypePath));
  const fundConfigList = yield select((state: any) =>
    lodash.get(state, FundConfigListModalDataPath)
  );
  const productConfigList = yield select((state: any) =>
    lodash.get(state, ProductCodeListModalDataPath)
  );

  const visibleConditions = getAllocationVisibleCondition(
    coverageList,
    fundList,
    fundSectionConfig
  );
  const newFundList = fundList
    ?.map(
      getFundWithDefaultAllocations({
        productConfigList,
        portfolioType,
        visibleConditions,
      })
    )
    ?.map(getFundWithFundName(fundConfigList));

  // set modal fundList
  yield put({
    type: `${NAMESPACE}/setProcessFundList`,
    payload: {
      fundList: newFundList,
    },
  });
}
