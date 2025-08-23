import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { isSelected, value } = lodash.pick(action.payload, ['isSelected', 'value']);
  const nextState = produce(state, (draftState: any) => {
    const customizeSusOptIdList = draftState.sustainabilityModal?.customizeSusOptIdList;
    const newCustomizeSusOptIdList = isSelected ? value : [...customizeSusOptIdList, ...value];
    lodash.set(draftState, 'sustainabilityModal.customizeSusOptIdList', newCustomizeSusOptIdList);
  });
  return {
    ...nextState,
  };
};
