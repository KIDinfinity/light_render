import { produce }  from 'immer';
import { tenant, Region } from '@/components/Tenant';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.push({
      claimType: draftState.claimProcessData?.[0]?.claimType || '',
      type: tenant.region({
        [Region.MY]: 'PendingDocument',
        notMatch: 'NewRequest',
      }),
    });
  });
  return { ...nextState };
};
