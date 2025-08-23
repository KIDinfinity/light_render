export default (state: any, action: any) => {
  return {
    ...state,
    insuredList: action.payload,
  };
};
