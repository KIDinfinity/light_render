import { Region, tenant } from '@/components/Tenant';
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { changedFields, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (
      lodash.has(changedFields, 'occupationCode') &&
      lodash.keys(changedFields).length === 1 &&
      tenant.region() === Region.MY
    ) {
      lodash.set(changedFields, 'occupationGroup', null);
      lodash.set(changedFields, 'occupationClass', null);
    }
    draftState.modalData.entities.clientMap[id].backgroundInfo = {
      ...(draftState.modalData.entities?.clientMap?.[id]?.backgroundInfo || {}),
      ...changedFields,
    };
  });

  return {
    ...nextState,
  };
};
