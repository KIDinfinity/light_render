import { useContext, useMemo } from 'react';
import Context from 'summary/Context';
import lodash from 'lodash';

export default ({ clientId }: any) => {
  const { state } = useContext(Context);
  return useMemo(() => {
    const { policyInfoList, coverageList, businessCode, claimHistoryList, posHistoryList } = lodash
      .chain(state)
      .get('c360.sideBarOverallList')
      .find((item: any) => lodash.get(item, 'keyClientId') === clientId)
      .pick(['policyInfoList', 'coverageList', 'businessCode', 'claimHistoryList', 'posHistoryList'])
      .value();
    return {
      policyInfoList,
      coverageList,
      businessCode,
      claimHistoryList,
      posHistoryList
    };
  }, [state, clientId]);
};
