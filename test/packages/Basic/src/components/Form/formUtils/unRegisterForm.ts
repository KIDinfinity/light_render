import lodash from 'lodash';

const unRegisterForm = (forms: any, form: any, formId: string, clone: boolean = true) => {
  const result = clone? { ...forms } : forms || {};
  const has = lodash.has(forms, formId);

  if (has) {
    delete result[formId];
  }

  return result;
};

export default unRegisterForm;
