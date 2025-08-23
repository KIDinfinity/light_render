import { produce }  from 'immer';

const saveFormData = (state: any, action: any) => {
  const { ruleAtomModule } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.ruleAtomModule = ruleAtomModule;
  });

  return { ...nextState };
};

export default saveFormData;
