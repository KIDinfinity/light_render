import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { nationality } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.nationality = nationality;
  });
  return { ...nextState };
};
