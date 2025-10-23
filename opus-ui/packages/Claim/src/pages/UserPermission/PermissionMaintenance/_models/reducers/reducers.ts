export default {
  saveClaimProcessData(state: any, { payload }: any) {
    return {
      ...state,
      ...payload,
    };
  },
  saveData(state: any, { payload }: any) {
    return {
      ...state,
      ...payload,
    };
  },
};
