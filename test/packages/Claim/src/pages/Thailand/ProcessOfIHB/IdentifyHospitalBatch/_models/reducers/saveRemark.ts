import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { idx, value, changedFields } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const key = lodash.keys(changedFields)?.[0];
    lodash.set(draftState.claimProcessData, `invoiceInforData[${idx}].${key}`, changedFields?.[key]);
  });
  return { ...nextState };
};
