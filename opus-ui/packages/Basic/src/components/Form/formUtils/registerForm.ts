import lodash from 'lodash';

const registerForm = (
  forms: any,
  form: any,
  formId: string,
  section: string,
  clone: boolean = true
) => {
  const result = clone ? { ...forms } : forms || {};
  const has = lodash.has(forms, formId);

  if (!has) {
    result[formId] = section ? { form, section } : form;
  } else {
    result[`${formId}-${lodash.size(forms)}`] =  section ? { form, section } : form;
  }

  return result;
};

export default registerForm;
