import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { DPRemarkItemId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const addDPRemarkItems = lodash.get(draftState, 'addDPRemarkItems');
    lodash.set(
      draftState,
      `addDPRemarkItems`,
      lodash.filter(addDPRemarkItems, (item) => item.id !== DPRemarkItemId)
    );
  });
  return { ...nextState };
};
