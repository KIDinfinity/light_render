import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ tsarCalculationCategory, monthPeriod, selectedRoleInd }: any) => {
  const coverageList = useSelector(({ insured360 }: any) => insured360.coverageList) || [];
  const tsarCalculationCategoryDisplayPeriod =
    useSelector(({ insured360 }: any) => insured360?.tsarCalculationCategoryDisplayPeriod) || [];

  const targetMonthPeriod = (() => {
    if (lodash.includes(tsarCalculationCategoryDisplayPeriod, tsarCalculationCategory)) {
      return 'ALL';
    }
    return monthPeriod;
  })();
  return useMemo(() => {
    const list = lodash
      .chain(coverageList)
      .filter({
        tsarCalculationCategory,
        monthPeriod: targetMonthPeriod,
        roleInd: selectedRoleInd,
        displayStyle: 'left',
        coverageStatus: 'ALL',
      })
      .filter((el: any) => el.coverageType !== 'ALL')
      .map((el: any) => ({
        coverageType: formatMessageApi({
          Label_Slider_360: el.coverageType,
        }),
        total: el.tsar,
        currency: el.currency,
        key: el.id,
      }))
      .value();

    const tsarSet = new Set(lodash.map(list, (item) => item.total));

    const total = lodash.filter(coverageList, {
      tsarCalculationCategory,
      monthPeriod: targetMonthPeriod,
      roleInd: selectedRoleInd,
      displayStyle: 'left',
      coverageStatus: 'ALL',
      coverageType: 'ALL',
    });

    return {
      list: list,
      total: total?.[0]?.tsar,
      currency: list?.[0]?.currency,
      isScale: tsarSet.size > 1,
    };
  }, [coverageList, targetMonthPeriod, tsarCalculationCategory, selectedRoleInd]);
};
