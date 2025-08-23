import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';

export default ({ checkList, processData }: any) => {
  const { mainPolicyId, sourceSystem, policyInfo } = lodash.pick(processData, [
    'mainPolicyId',
    'sourceSystem',
    'policyInfo',
  ]);
  const info =
    lodash
      .chain(policyInfo)
      .get('policyInfoList')
      .find((item: any) => item.policyId === mainPolicyId && item.sourceSystem === sourceSystem)
      .value() || {};
  const newTrusteeIndicator = info?.trusteeIndicator === 'Y' ? 'Y' : 'N';

  return tenant.region() === Region.MY && newTrusteeIndicator === 'N'
    ? lodash.filter(checkList, (item) => lodash.isObject(item) ? item.code !== 'CL_TrusteeConsent' : item !== 'CL_TrusteeConsent')
    : checkList || [];
};
