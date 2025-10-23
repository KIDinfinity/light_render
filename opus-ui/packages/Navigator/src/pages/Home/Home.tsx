import React from 'react';
import Watching from './Watching';
import Filter from './Watching/View/Filter';
import Dashboard from './Dashboard';
import Monitor from './Monitor';
import { Mode } from './Watching/View/ModePanel/Mode';
import { useSelector } from 'dva';
import { TypeEnum } from '@/enum/GolbalAuthority';
import lodash from 'lodash';

export default () => {
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const mode = useSelector((state: any) => state.navigatorHomeWatching.mode) || '';
  const AuthMonitorEntry = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result && item.type === TypeEnum.Comm)
    .map((item) => item.authorityCode)
    .find((item) => item === 'RS_Entry_MonitorEntry')
    .value();
  return (
    <>
      <Filter authMonitorEntry={AuthMonitorEntry} />
      {mode === Mode.Flow && AuthMonitorEntry ? (
        <Monitor />
      ) : (
        <>
          <Watching />
          <Dashboard />
        </>
      )}
    </>
  );
};
