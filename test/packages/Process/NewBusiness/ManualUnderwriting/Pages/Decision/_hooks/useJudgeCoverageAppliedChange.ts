import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ coverageId }) => {
  const sustainabilityOptions: any = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.sustainabilityOptions,
    shallowEqual
  );

  const result = useMemo(() => {
    const isItemChange = lodash
      .chain(sustainabilityOptions)
      .find((option: any) => option.applied === 'Y')
      .get('selectedOptions')
      .some((option: any) => {
        return lodash.some(option?.items, (item: any) => item.coverageId === coverageId);
      })
      .value();

    const isRTCoverage = lodash
      .chain(sustainabilityOptions)
      .find((option: any) => option.applied === 'Y')
      .get('selectedOptions')
      .some((option: any) => {
        return option?.rtCoverage?.id === coverageId;
      })
      .value();

    const isATCoverage = lodash
      .chain(sustainabilityOptions)
      .find((option: any) => option.applied === 'Y')
      .get('selectedOptions')
      .some((option: any) => {
        return option?.atCoverage?.id === coverageId;
      })
      .value();

    return isItemChange || isRTCoverage || isATCoverage;
  }, [sustainabilityOptions, coverageId]);
  return result;
};
