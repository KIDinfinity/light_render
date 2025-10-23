import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSustainabilityCheckingData from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingData';
import useGetSustainabilityCheckingSelectedItem from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingSelectedItem';

export default () => {
  const sustainabilityCheckingData: any = useGetSustainabilityCheckingData();
  const selectedItem: any = useGetSustainabilityCheckingSelectedItem();

  return useMemo(() => {
    const policyList = lodash
      .chain(sustainabilityCheckingData)
      .get('policyList', [])
      .map((policy: any) => {
        if (policy?.policyId === selectedItem?.policyId) {
          const coverageList = (() => {
            const updatedValueCoverage = lodash
              .chain(policy)
              .get('coverageList', [])
              .map((coverage: any) => {
                const changeDatas = lodash
                  .chain(selectedItem)
                  .get('selectedOptions')
                  .filter((changeItem: any) => {
                    return lodash.some(changeItem.items, (item) => item.coverageId === coverage.id);
                  })
                  .map((option: any) => {
                    return lodash
                      .chain(option)
                      .get('items')
                      .find((item: any) => item.coverageId === coverage.id)
                      .value();
                  })
                  .value();
                const update = (() => {
                  const dataMap = new Map();

                  lodash
                    .chain(coverage)
                    .entries()
                    .forEach(([key]: any) => {
                      lodash.forEach(changeDatas, (changeData: any) => {
                        if (
                          !!lodash.get(changeData, `${key}AF`) &&
                          !!lodash.get(changeData, `${key}BE`)
                        ) {
                          dataMap.set(key, lodash.get(changeData, `${key}AF`));
                          dataMap.set(`${key}BE`, lodash.get(changeData, `${key}BE`));
                        }
                      });
                    })
                    .value();
                  return Object.fromEntries(dataMap);
                })();
                return {
                  ...coverage,
                  ...update,
                };
              })
              .value();

            const extraCoverageSet = new Set();
            lodash
              .chain(selectedItem)
              .get('selectedOptions', [])
              .forEach((optionItem: any) => {
                if (
                  lodash.has(optionItem, 'rtCoverage') &&
                  !lodash.chain(optionItem).get('rtCoverage').isEmpty().value()
                ) {
                  extraCoverageSet.add(
                    lodash
                      .chain(optionItem)
                      .get('rtCoverage')
                      .assign({ rtCoverageFlag: true })
                      .value()
                  );
                }
              })
              .value();
            return [...updatedValueCoverage, ...Array.from(extraCoverageSet)];
          })();

          return {
            ...policy,
            coverageList,
          };
        }
        return {
          ...policy,
        };
      })
      .value();
    const sustainabilityOptions = lodash
      .chain(sustainabilityCheckingData)
      .get('sustainabilityOptions', [])
      .map((item: any) => {
        return {
          ...item,
          applied: selectedItem?.optionName === item.optionName ? 'Y' : 'N',
        };
      })
      .value();

    return {
      ...sustainabilityCheckingData,
      policyList,
      sustainabilityOptions,
    };
  }, [sustainabilityCheckingData, selectedItem]);
};
