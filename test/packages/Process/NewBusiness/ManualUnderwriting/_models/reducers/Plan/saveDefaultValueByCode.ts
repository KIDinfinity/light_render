import { produce } from 'immer';

export default (state: any, action: any) => {
  const { codeType, defaultValue } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.defaultValueByCode[codeType] = defaultValue;
  });
  return {
    ...nextState,
  };
};
