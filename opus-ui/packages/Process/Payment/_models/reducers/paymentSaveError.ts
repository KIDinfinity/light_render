import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { errors, tabErrors } = payload;

    if (errors) {
      draftState.paymentModal.errors = errors;
    }

    if (tabErrors) {
      draftState.paymentModal.tabErrors = tabErrors;
    }
  });
};
