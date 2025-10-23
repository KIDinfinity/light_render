import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { fieldName, filterChoice } = payload || {};

  const nextState = produce(state, (draftState: any) => {
    draftState.incompleteCases.filterChoice = lodash.isEmpty(filterChoice)
      ? lodash.omit(draftState.filterChoice, fieldName)
      : {
          ...draftState.incompleteCases.filterChoice,
          [fieldName]: filterChoice,
        };
  });
  return { ...nextState };
};
