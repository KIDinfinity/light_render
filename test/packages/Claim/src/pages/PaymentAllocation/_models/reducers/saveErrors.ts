import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { errors, tabErrors } = payload;

    if(errors){
      draft.errors = errors;
    }

    if(tabErrors){
      draft.tabErrors = tabErrors;
    }
  });
};
