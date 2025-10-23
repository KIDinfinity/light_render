import { formUtils } from 'basic/components/Form';

const unRegisterForm = (state: any, action: any) => {
  const { forms } = state;
  const { form, formId } = action.payload;
  const orginForms = formUtils.unRegisterForm(forms, form, formId);

  return {
    ...state,
    forms: orginForms,
  };
};

export default unRegisterForm;
