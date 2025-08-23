import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetTableColumnsByPageConfig from 'basic/hooks/useGetTableColumnsByPageConfig';

export default () => {
  const sectionConfig = useGetTableColumnsByPageConfig({
    section: 'WaiveLoading-Table',
    localConfig: {},
  });
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const data = lodash.filter(
      coverageList,
      (coverage) => !lodash.isEmpty(coverage.coverageLoadingList)
    );
    return lodash
      .chain(data)
      .map((item) => {
        return lodash.map(sectionConfig, (config) => {
          let highlight = false;
          const value = (() => {
            if (config.id === 'coreCode' && !lodash.isEmpty(item.productName)) {
              return `${lodash.get(item, config.id)} - ${lodash.get(item, 'productName')} `;
            } else {
              if (!lodash.isNil(lodash.get(item, `${config.id}Waive`))) {
                highlight = !lodash.isEqual(item[`${config.id}Waive`], item[config.id]);
                return lodash.get(item, `${config.id}Waive`, null);
              } else {
                return lodash.get(item, config.id, null);
              }
            }
          })();
          return {
            ...item,
            ...config,
            value,
            id: item.id,
            highlight,
          };
        });
      })
      .value();
  }, [coverageList, sectionConfig]);
};
