export default (state: any, action: any) => {
  const { excelData } = action.payload;
  return {
    ...state,
    excelData,
  };
};
