import { useCallback } from 'react';
import lodash from 'lodash';
import RiskIndicatorMatchType from 'process/NB/ManualUnderwriting/Enum/RiskIndicatorMatchType';
import useRiskIndicatorConfigFilterListByRole from 'process/NB/ManualUnderwriting/_hooks/useRiskIndicatorConfigFilterListByRole';

export default ({ id }: any) => {
  const riskIndicatorConfigFilterList = useRiskIndicatorConfigFilterListByRole({ id });
  return useCallback(
    ({ item }: any) => {
      const matchRiskIndicator = lodash.find(
        riskIndicatorConfigFilterList,
        (risk: any) => risk?.riskFactorCode === item?.label
      );
      if (
        lodash.get(item, 'status') === RiskIndicatorMatchType.Match &&
        !lodash.chain(matchRiskIndicator).get('linkTo').isEmpty().value()
      ) {
        window.open(lodash.get(matchRiskIndicator, 'linkTo'), '_blank');
      }
    },
    [riskIndicatorConfigFilterList]
  );
};
