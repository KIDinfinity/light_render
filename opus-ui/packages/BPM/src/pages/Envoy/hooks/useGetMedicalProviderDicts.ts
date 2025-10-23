import { useSelector } from 'dva';
import lodash from 'lodash';
import { useCallback } from 'react';

export default () => {
  const medicalProviderDicts = useSelector((state: any) =>
    lodash.get(state, 'envoyController.medicalProviderDicts')
  );
  return useCallback(
    (dictCode: string) => {
      return medicalProviderDicts[dictCode] || dictCode;
    },
    [medicalProviderDicts]
  );
};
