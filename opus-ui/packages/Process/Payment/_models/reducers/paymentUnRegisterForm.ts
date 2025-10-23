import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { forms } = draft;
    const { form, formId } = payload;
    const orginForms = formUtils.unRegisterForm(forms, form, formId);

    draft.paymentModal.forms = orginForms;
  });
};
