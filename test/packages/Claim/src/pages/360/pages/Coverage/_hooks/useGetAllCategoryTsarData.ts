import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

export default ({ monthPeriod, selectedRoleInd }: any) => {
  const coverageList = useSelector(({ insured360 }: any) => insured360.coverageList);
  const tsarCalculationCategoryDisplayPeriod =
    useSelector(({ insured360 }: any) => insured360?.tsarCalculationCategoryDisplayPeriod) || [];

  return useMemo(() => {
    return lodash
      .chain(coverageList)
      .filter((coverageItem) => {
        if (
          lodash.includes(
            tsarCalculationCategoryDisplayPeriod,
            coverageItem.tsarCalculationCategory
          )
        ) {
          const isMEDCoverageItem = lodash.filter([coverageItem], {
            monthPeriod: 'ALL',
            roleInd: selectedRoleInd,
            coverageType: 'ALL',
            coverageStatus: 'ALL',
            displayStyle: 'left',
          });
          return !lodash.isEmpty(isMEDCoverageItem);
        }
        const isCoverageItem = lodash.filter([coverageItem], {
          monthPeriod,
          roleInd: selectedRoleInd,
          coverageType: 'ALL',
          coverageStatus: 'ALL',
          displayStyle: 'left',
        });
        return !lodash.isEmpty(isCoverageItem);
      })
      .value();
  }, [coverageList, tsarCalculationCategoryDisplayPeriod, selectedRoleInd, monthPeriod]);
};
