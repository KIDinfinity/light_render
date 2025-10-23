import { produce } from 'immer';

export default (state: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    draft.forms = {};
  });
};
