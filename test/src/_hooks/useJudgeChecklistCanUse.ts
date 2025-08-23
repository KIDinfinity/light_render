import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';

export default () => {
  const tabAuthorized = useSelector(
    (state: any) => state.workspaceSwitchOn.tabAuthorized,
    shallowEqual
  );

  return useMemo(() => {
    return lodash.includes(tabAuthorized, SwitchDrawerTab.Integration);
  }, [tabAuthorized]);
};
