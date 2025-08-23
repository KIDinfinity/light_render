export default (state: any, { payload }: any) => {
  const { patchList } = payload;
  state.tempDataPatch.patchList = patchList;
  return state;
};
