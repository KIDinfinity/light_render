import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import flatProductConfig from 'process/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';

export default ({ coverageId, field }: any) => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.planProductConfig,
    shallowEqual
  );
  const coverageList = useGetCoverageList();
  const judgeKeyMapping = {
    pmLoading: 'rateTermFollowCode',
    extraMortality: 'meTermFollowCode',
    flatMortality: 'feTermFollowCode',
  };
  const productList = flatProductConfig({ planProductConfig });
  const judgeKey = judgeKeyMapping[field];
  return useMemo(() => {
    const coverage = lodash
      .chain(coverageList)
      .find((coverageItem: any) => coverageItem.id === coverageId)
      .value();
    const { coreCode } = lodash.chain(coverage).pick(['coreCode', 'isMain']).value();
    const periodMapping = {
      PT: 'payPeriod',
      RT: 'indemnifyPeriod',
    };
    const loadingTermFollowCode = lodash
      .chain(productList)
      .find((item: any) => item.productCode === formUtils.queryValue(coreCode))
      .get(judgeKey)
      .value();

    const dataSourceKey = periodMapping[loadingTermFollowCode] || 'payPeriod';
    return formUtils.queryValue(lodash.get(coverage, dataSourceKey));
  }, [coverageList, planProductConfig, coverageId, judgeKey]);
};
