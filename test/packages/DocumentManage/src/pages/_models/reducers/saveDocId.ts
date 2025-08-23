export default (state: any, { payload }: any = {}) => {
  return {
    ...state,
    docIdConfig: payload
  }
};
