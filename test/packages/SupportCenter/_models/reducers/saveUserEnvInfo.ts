export default (state: any, { payload }: any) => {
  const { switchRegionList } = payload;

  return {
    ...state,
    switchRegionList,
  };
};
