const updateSearchModal = (state: any, action: any) => {
  const { activeCode, params } = action.payload;

  const currentGroupId = params?.groupId || state.currentGroupId;
  const currentBranchVOId = params?.currentBranchVOId || state.currentBranchVOId;
  const onSearchOk = params?.onSearchOk || state.actionCallBack.onSearchOk;

  return {
    ...state,
    searchData: {
      ...state.searchData,
      activeCode,
    },
    actionCallBack: {
      ...state.actionCallBack,
      onSearchOk,
    },
    currentGroupId,
    currentBranchVOId,
    modalOptions: {
      ...state.modalOptions,
      search: {
        show: true,
        type: activeCode,
      },
    },
  };
};

export default updateSearchModal;
