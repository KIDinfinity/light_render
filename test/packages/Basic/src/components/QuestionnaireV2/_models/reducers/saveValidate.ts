export default (state: any, { payload }: any) => {
  return {
    ...state,
    validating: payload.validating,
  };
};
