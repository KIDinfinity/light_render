export default (state: any, { payload }: any) => ({
  ...state,
  pdfData: payload.pdfData,
});
