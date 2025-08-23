const updateForm = (forms: any, form: any, formId: string) => {
  const result = { ...forms };
  result[formId] = form;

  return result;
};

export default updateForm;
