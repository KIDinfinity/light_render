import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { CaseManagement } from '@/auth/Constant';
export default () => {
  const permissionMenus = useSelector(
    ({ authController }: any) => authController.permissionMenus,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.some(permissionMenus, (el) => el === CaseManagement.RS_HK_Button_CaseMgm_Reverse);
  }, [permissionMenus]);
};
