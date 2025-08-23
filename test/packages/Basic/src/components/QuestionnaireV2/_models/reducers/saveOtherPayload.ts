export default (state: any, { payload }: any) => {
  return {
    ...state,
    otherPayload: payload,
  };
};
