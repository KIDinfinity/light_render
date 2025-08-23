import { tenant, Region } from '@/components/Tenant';
import CustomerRole from 'basic/enum/CustomerRole';
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const riskIndicatorConfigList = draftState.riskIndicatorConfigList;
    let customers = draftState.entities?.clientMap;
    customers = tenant.region({
      [Region.MY]: lodash.filter(customers, (item) => {
        return lodash.includes(item?.personalInfo?.customerRole, CustomerRole.PolicyOwner);
      }),
      notMatch: null,
    });

    const result = lodash.some(customers, (item) => {
      const targetRisk = lodash.find(riskIndicatorConfigList, {
        clientId: item.id,
        riskFactorCode: 'CRR',
      });
      return targetRisk?.status === 'Y';
    });

    return lodash.set(draftState, `isCertificateCRR`, result);
  });

  return { ...nextState };
};
