import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { personName } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.personName = personName;
  });
  return { ...nextState };
};
