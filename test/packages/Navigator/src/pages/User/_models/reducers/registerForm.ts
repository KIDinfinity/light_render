/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload: { form, formId } }: any) =>
  produce(state, (draftState: any) => {
    draftState.forms = formUtils.registerForm(draftState.forms, form, formId);
  });
