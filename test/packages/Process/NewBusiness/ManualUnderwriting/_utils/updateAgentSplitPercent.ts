import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';

export default (agentList: any) => {
  return lodash.map(agentList, (agentInfo: any) => {
    const commissionSplitPercent = (() => {
      return tenant.region({
        [Region.TH]: (() => {
          if (agentList?.length === 2) {
            return 50;
          }

          if (agentList?.length === 1) {
            return 100;
          }
          return agentInfo.commissionSplitPercent;
        })(),
        notMatch: agentInfo.commissionSplitPercent,
      });
    })();
    return {
      ...agentInfo,
      commissionSplitPercent,
    };
  });
};
