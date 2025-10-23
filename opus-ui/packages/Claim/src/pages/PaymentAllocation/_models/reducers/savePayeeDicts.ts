import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { payeeDicts } = payload;

    draft.payeeDicts = payeeDicts;
  });
};
