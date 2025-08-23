import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload: { form, formId } }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    draft.forms = formUtils.updateForm(draft.forms, form, formId);
  });
};
