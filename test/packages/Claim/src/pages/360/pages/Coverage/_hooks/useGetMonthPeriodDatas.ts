import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

export default (selectedRoleInd: string) => {
  const coverageList = useSelector(({ insured360 }: any) => insured360.coverageList) || [];

  return useMemo(() => {
    return (
      lodash
        .chain(coverageList)
        .filter({ roleInd: selectedRoleInd, displayStyle: 'left' })
        .uniqBy('monthPeriod')
        .sortBy(item => {
          if (item.monthPeriod === 'ALL') return -1;
          return Number(item.monthPeriod);
        })
        .value() || []
    );
  }, [coverageList, selectedRoleInd]);
};
