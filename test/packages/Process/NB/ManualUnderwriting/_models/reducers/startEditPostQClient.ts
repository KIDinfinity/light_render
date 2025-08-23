import saveUpdatePolicyOriginalDraft from './saveUpdatePolicyOriginalDraft';

export default (state: any) => {
  return saveUpdatePolicyOriginalDraft(state, {
    payload: {
      updatingPolicyOriginalDraft: state?.businessData,
    },
  });
};
