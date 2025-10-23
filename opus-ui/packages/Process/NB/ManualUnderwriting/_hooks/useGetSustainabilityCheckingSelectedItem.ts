import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSustainabilityCheckingSelected from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingSelected';
import useGetSustainabilityCheckingOptions from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingOptions';

export default () => {
  const options = useGetSustainabilityCheckingOptions();
  const sustainabilityCheckingSelected = useGetSustainabilityCheckingSelected();

  return useMemo(() => {
    const optionItem = lodash
      .chain(options)
      .find((item: any) => item.optionName === sustainabilityCheckingSelected)
      .value();

    const selectedOptions = lodash.chain(optionItem).get('selectedOptions', []).value();

    const filterOptions = lodash
      .chain(selectedOptions)
      .filter((item: any, index: number) => {
        const firstIndex = lodash.findIndex(selectedOptions, (op: any) => op.name == item.name);
        const lastIndex = lodash.findLastIndex(selectedOptions, (op: any) => op.name == item.name);
        if (firstIndex !== lastIndex && index !== lastIndex) {
          return false;
        }
        return true;
      })
      .value();
    return {
      ...optionItem,
      selectedOptions: filterOptions,
    };
  }, [sustainabilityCheckingSelected, options]);
};
