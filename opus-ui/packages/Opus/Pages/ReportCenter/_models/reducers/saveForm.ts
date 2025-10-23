export default (state: any, { payload }: any) => ({
  ...state,
  form: payload.form,
});
