export default (state: any, { payload }: any = {}) => {
  return {
    ...state,
    showReIndex: payload?.visible,
  };
};
