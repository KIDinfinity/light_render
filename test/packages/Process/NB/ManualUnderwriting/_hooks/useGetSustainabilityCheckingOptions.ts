import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const sustainabilityCheckingData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sustainabilityCheckingData,
    shallowEqual
  );

  return useMemo(() => {
    const sustainabilityOptions =
      lodash.get(sustainabilityCheckingData, 'sustainabilityOptions') || [];
    return [
      // {
      //   ...lodash
      //     .chain(sustainabilityOptions)
      //     .first()
      //     .pick(['applicationNo', 'policyId', 'version'])
      //     .value(),
      //   selectedOptions: [],
      //   optionName: 'initial',
      // },
      ...sustainabilityOptions,
    ];
  }, [sustainabilityCheckingData]);
};
