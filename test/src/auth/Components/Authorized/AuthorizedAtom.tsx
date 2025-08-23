import React, { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

const AuthorizedAtom = ({ currentAuthority, children, ...others }: any) => {
  const authorityCodeList = useSelector(
    ({ authController }: any) => authController.authorityCodeList,
    shallowEqual
  );
  const commonAuthorityList = useSelector(
    ({ authController }: any) => authController.commonAuthorityList,
    shallowEqual
  );
  const hasAuth = useMemo(() => {
    if (!lodash.some(commonAuthorityList, (item: any) => item.authorityCode === currentAuthority)) {
      return true;
    }
    return authorityCodeList.includes(currentAuthority);
  }, [authorityCodeList, currentAuthority, commonAuthorityList]);
  return <> {hasAuth && React.cloneElement(children, { ...others })}</>;
};

export default AuthorizedAtom;
