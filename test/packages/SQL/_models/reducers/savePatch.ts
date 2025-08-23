export default (state: any, { payload }: any) => {
  const { changedFields } = payload;
  state.tempDataPatch.patch = {
    ...state.tempDataPatch.patch,
    ...changedFields,
  };
  return state;
};
