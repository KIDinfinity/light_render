import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';

export default (clientId: string) => {
  const riskIndicatorConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.riskIndicatorConfigList,
    shallowEqual
  );
  const CRRstatus = lodash.find(riskIndicatorConfigList, {
    clientId,
    riskFactorCode: 'CRR',
  })?.status;
  return useMemo(() => CRRstatus === 'Y', [CRRstatus]);
};
