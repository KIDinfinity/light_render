import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

export default ({ displayStyle }: any) => {
  const coverageList = useSelector(({ insured360 }: any) => insured360?.coverageList);
  return useMemo(() => {
    const coverageRoleList = lodash
      .chain(coverageList)
      .filter((item: any) => item.displayStyle === displayStyle)
      .map((coverageItem: any) => lodash.get(coverageItem, 'roleInd'))
      .uniq()
      .compact()
      .value();

    return coverageRoleList;
  }, [coverageList]);
};
