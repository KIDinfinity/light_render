import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default (type?: string) => {
  let coverageList: any;
  if (type === 'edit') {
    coverageList = useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.modalData?.processData?.coverageList ||
        modelnamepsace.processData?.coverageList,
      shallowEqual
    );
  } else {
    coverageList = useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList,
      shallowEqual
    );
  }

  return useMemo(() => {
    return (
      lodash
        .chain(coverageList)
        .map((coverage: any) => {
          return {
            ...coverage,
            isMainWeight: coverage.isMain === 'Y' ? 1 : 0,
          };
        })
        .orderBy(['isMainWeight', 'lifeNo'], ['desc', 'asc'])
        .map((coverage: any) => {
          const { isMainWeight, ...others } = coverage;
          return others;
        })
        .value() || []
    );
  }, [coverageList]);
};
