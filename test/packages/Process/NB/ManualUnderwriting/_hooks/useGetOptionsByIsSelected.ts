import lodash from 'lodash';
import { useCallback } from 'react';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const possibleSusOptNames = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.possibleSusOptNames,
    shallowEqual
  );
  const possibleSusOptNamesSelected = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.possibleSusOptNamesSelected,
    shallowEqual
  );
  return useCallback(
    (isSelected: any) => {
      return isSelected
        ? possibleSusOptNamesSelected
        : lodash.filter(
            possibleSusOptNames,
            (item) => !lodash.includes(possibleSusOptNamesSelected, item)
          );
    },
    [possibleSusOptNames, possibleSusOptNamesSelected]
  );
};
