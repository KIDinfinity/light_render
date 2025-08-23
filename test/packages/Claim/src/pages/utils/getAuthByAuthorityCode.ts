import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default (params) => {
  const currentAuthority = params?.authorityCode;
  if (!currentAuthority) {
    return false;
  }
  const commonAuthorityList = useSelector(
    ({ authController }: any) => authController.commonAuthorityList,
    shallowEqual
  );
  const hasAuth =
    lodash.find(commonAuthorityList, { authorityCode: currentAuthority })?.result || false;
  return hasAuth;
};
