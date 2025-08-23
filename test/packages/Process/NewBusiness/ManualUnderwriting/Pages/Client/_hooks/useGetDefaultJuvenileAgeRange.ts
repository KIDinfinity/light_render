import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const processData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData,
    shallowEqual
  );

  const maxAgeConditionForLegalRepresentative = lodash
    .chain(processData)
    .get('cfgRegionalDefaultValueList', [])
    .find((item: any) => item?.codeType === 'maxAgeConditionForLegalRepresentative')
    .get('defaultValue')
    .value();

  const minAgeConditionForLegalRepresentative = lodash
    .chain(processData)
    .get('cfgRegionalDefaultValueList', [])
    .find((item: any) => item?.codeType === 'minAgeConditionForLegalRepresentative')
    .get('defaultValue')
    .value();

  return useMemo(() => {
    const min = !lodash.isNaN(+minAgeConditionForLegalRepresentative)
      ? +minAgeConditionForLegalRepresentative
      : undefined;
    const max = !lodash.isNaN(+maxAgeConditionForLegalRepresentative)
      ? +maxAgeConditionForLegalRepresentative
      : undefined;

    return [min, max];
  }, [maxAgeConditionForLegalRepresentative, minAgeConditionForLegalRepresentative]);
};
