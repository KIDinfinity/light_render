export default (state: any, action: any) => {
  return {
    ...state,
    checkAll: !state?.checkAll,
  };
};
