import { useCallback, useContext } from 'react';
import lodash from 'lodash';
import Context from 'summary/Context';

export default () => {
  const { state } = useContext(Context);
  return useCallback(
    ({ clientId }: any) => {
      const { policyInfoList, coverageList } = lodash
        .chain(state)
        .get('c360.sideBarOverallList')
        .find((item: any) => lodash.get(item, 'keyClientId') === clientId)
        .pick(['policyInfoList', 'coverageList', 'businessCode'])
        .value();
      if (!lodash.isArray(policyInfoList) && !lodash.isArray(coverageList)) {
        return true;
      }
      if (
        lodash.isArray(policyInfoList) &&
        lodash.isEmpty(policyInfoList) &&
        lodash.isArray(coverageList) &&
        lodash.isEmpty(coverageList)
      ) {
        return true;
      }
      return false;
    },
    [state]
  );
};
