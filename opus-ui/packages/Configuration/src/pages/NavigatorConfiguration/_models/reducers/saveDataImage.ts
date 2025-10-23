export default (state: any, action: any) => {
  const { dataImage } = action.payload;
  return {
    ...state,
    dataImage,
  };
};
