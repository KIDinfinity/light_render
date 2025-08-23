import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSustainabilityCheckingData from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingData';

export default ({ coverageId }) => {
  const sustainabilityCheckingData: any = useGetSustainabilityCheckingData();

  const result = useMemo(() => {
    const isItemChange = lodash
      .chain(sustainabilityCheckingData)
      .get('sustainabilityOptions')
      .find((option: any) => option.applied === 'Y')
      .get('selectedOptions')
      .some((option: any) => {
        return lodash.some(option?.items, (item: any) => item.coverageId === coverageId);
      })
      .value();

    const isRTCoverage = lodash
      .chain(sustainabilityCheckingData)
      .get('sustainabilityOptions')
      .find((option: any) => option.applied === 'Y')
      .get('selectedOptions')
      .some((option: any) => {
        return option?.rtCoverage?.id === coverageId;
      })
      .value();

    return isItemChange || isRTCoverage;
  }, [sustainabilityCheckingData, coverageId]);
  return result;
};
