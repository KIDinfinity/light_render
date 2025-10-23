export default (state: any, action: any) => {
  const { changeData } = action.payload;
  return {
    ...state,
    changeData,
  };
};
