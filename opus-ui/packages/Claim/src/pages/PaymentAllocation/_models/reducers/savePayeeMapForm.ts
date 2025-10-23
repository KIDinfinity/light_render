import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { formId, payeeId } = payload;

    draft.payeeMapform = { ...draftState.payeeMapform, [payeeId]: formId };
  });
};
