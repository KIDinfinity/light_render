import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ currentAuthority }: any) => {
  const authorityCodeList = useSelector(
    ({ authController }: any) => authController.authorityCodeList,
    shallowEqual
  );
  const commonAuthorityList = useSelector(
    ({ authController }: any) => authController.commonAuthorityList,
    shallowEqual
  );
  return useMemo(() => {
    if (!lodash.some(commonAuthorityList, (item: any) => item.authorityCode === currentAuthority)) {
      return true;
    }
    return authorityCodeList.includes(currentAuthority);
  }, [authorityCodeList, currentAuthority, commonAuthorityList]);
};
