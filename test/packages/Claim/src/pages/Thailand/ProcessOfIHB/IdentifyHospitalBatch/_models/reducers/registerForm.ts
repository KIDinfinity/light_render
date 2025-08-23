import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

const registerForm = (state: any, { payload: { form, formId } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      forms: formUtils.registerForm(draftState.claimProcessData.forms, form, formId),
    };
  });
  return { ...nextState };
};

export default registerForm;
