export default (state: any, action: any) => {
  return {
    ...state,
    identityParams: action?.payload,
  };
};
