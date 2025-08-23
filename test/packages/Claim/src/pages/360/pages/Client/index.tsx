import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { TabsKey } from 'claim/pages/360/enum';
import useExpanderController from 'navigator/hooks/useExpanderController';
import ClientInfoDetali from './clientInfoDetali';
import ClientInfoBrief from './clientInfoBrief';

export default () => {
  const { isExpanderSwitchOn } = useExpanderController();
  const c360Tab = useSelector((state: any) => state.workspaceSwitchOn?.c360Tab);
  const needDetali = !lodash.includes([TabsKey.coverage], c360Tab);
  return isExpanderSwitchOn && needDetali ? <ClientInfoDetali /> : <ClientInfoBrief />;
};
