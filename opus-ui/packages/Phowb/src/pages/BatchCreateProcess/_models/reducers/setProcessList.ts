export default (state: any, action: any) => {
  return {
    ...state,
    processList: action?.payload?.processList,
  };
};
