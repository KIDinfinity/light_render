export default (state: any, action: any) => {
  return {
    ...state,
    currentDocument: action.payload,
  };
};
