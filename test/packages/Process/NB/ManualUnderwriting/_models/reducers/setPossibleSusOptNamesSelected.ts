import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { isSelected, value } = lodash.pick(action.payload, ['isSelected', 'value']);
  const nextState = produce(state, (draftState: any) => {
    const possibleSusOptNamesSelected = isSelected
      ? value
      : lodash
          .chain(draftState)
          .get('possibleSusOptNamesSelected', [])
          .union(isSelected ? [] : value)
          .value();
    lodash.set(draftState, 'possibleSusOptNamesSelected', possibleSusOptNamesSelected);
  });
  return {
    ...nextState,
  };
};
