import { useMemo } from 'react';
import lodash from 'lodash';
import useGetWaiveLoadingData from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetWaiveLoadingData';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetTableColumnsByPageConfig from 'basic/hooks/useGetTableColumnsByPageConfig';

export default () => {
  const totalFields = ['loadingPremium', 'instalmentPremiumWithTax'];
  const sectionConfig = useGetTableColumnsByPageConfig({
    section: 'WaiveLoading-Table',
    localConfig: {},
  });
  const coverageList = useGetCoverageList();
  const waiveLoadingData = useGetWaiveLoadingData();
  return useMemo(() => {
    const filterData = lodash
      .chain(waiveLoadingData)
      .map((dataItem) => {
        return lodash.filter(dataItem, (item) => lodash.includes(totalFields, item.fieldName));
      })
      .value();
    const totalMap = new Map();
    lodash.forEach(totalFields, (field) => {
      lodash.forEach(filterData, (dateItem) => {
        lodash.forEach(dateItem, (item) => {
          if (item.fieldName === field) {
            const totalItem = totalMap.get(field)?.total;
            const highlight = totalMap.get(field)?.highlight || item.highlight;
            const totalItemData = { ...item, total: lodash.add(totalItem, item.value), highlight };
            totalMap.set(field, totalItemData);
          }
        });
      });
    });
    const otherInstalmentPremiumWithTaxTotal = lodash
      .chain(coverageList)
      .filter((coverage) => lodash.isEmpty(coverage.coverageLoadingList))
      .sumBy((item) => item?.instalmentPremiumWithTax || 0)
      .add(totalMap.get('instalmentPremiumWithTax').total || 0)
      .value();
    totalMap.set('instalmentPremiumWithTax', {
      ...totalMap.get('instalmentPremiumWithTax'),
      total: otherInstalmentPremiumWithTaxTotal,
    });
    return Object.fromEntries(totalMap);
  }, [waiveLoadingData, sectionConfig, coverageList]);
};
