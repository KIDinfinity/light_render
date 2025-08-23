export default (state: any, action: any) => {
  const { previewRecord } = action.payload;

  return {
    ...state,
    previewRecord,
  };
};
