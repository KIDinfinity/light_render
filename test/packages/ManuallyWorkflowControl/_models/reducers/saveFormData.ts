interface IAction {
  payload: any;
}

export default function saveFormData(state: any, { payload }: IAction) {
  return {
    ...state,
    formData: {
      ...state?.formData,
      ...payload,
    },
  };
}
