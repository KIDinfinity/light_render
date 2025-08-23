import { formUtils } from 'basic/components/Form';
const registerForm = (state: any, action: any) => {
  const { forms } = state;
  const { form, formId } = action.payload;
  const orginForms = formUtils.registerForm(forms, form, formId);
  return {
    ...state,
    forms: orginForms,
  };
};

export default registerForm;
