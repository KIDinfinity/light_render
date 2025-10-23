export default (state) => {
  return {
    ...state,
    showMultiSelect: false,
    isShowArchive: false,
    archiveList: {
      archiveListInIt: [],
      archiveListParams: [],
    },
  };
};
