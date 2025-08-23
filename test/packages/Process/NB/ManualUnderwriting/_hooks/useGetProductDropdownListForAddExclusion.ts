import { useMemo } from 'react';
import useGetExclusionProductDropdownList from 'process/NB/ManualUnderwriting/_hooks/useGetExclusionProductDropdownList';

export default () => {
  const productDropdown = useGetExclusionProductDropdownList();
  return useMemo(() => {
    return [
      // {
      //   dictCode: 'All',
      //   dictName: 'All',
      // },
      ...productDropdown,
    ];
  }, [productDropdown]);
};
