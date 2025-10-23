export default {
  submit: {
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'UnknownDocumentController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch }) => {
      const dataForSubmit = await dispatch({
        type: 'UnknownDocumentController/getDataForSubmit',
      });
      const dataForSave = await dispatch({ type: 'UnknownDocumentController/getDataForSave' });
      return {
        1: dataForSubmit,
        2: dataForSave,
      };
    },
  },
  save: {
    action: async ({ dispatch }) => {
      const dataForSave = await dispatch({
        type: 'UnknownDocumentController/getDataForSubmit',
      });
      return {
        1: dataForSave,
      };
    },
  },
};
