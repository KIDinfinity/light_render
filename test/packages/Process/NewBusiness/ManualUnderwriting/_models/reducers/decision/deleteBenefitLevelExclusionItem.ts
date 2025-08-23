
export default (state: any, action: any) => {
  const { id } = action?.payload;

  for (const coverageItem of state.processData.coverageList) {
    coverageItem.coverageExclusionList =
      coverageItem.coverageExclusionList?.filter((item) => item.id !== id && item.copyId !== id) ||
      [];
  }
};
