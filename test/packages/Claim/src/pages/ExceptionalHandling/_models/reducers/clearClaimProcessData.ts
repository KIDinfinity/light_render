const clearClaimProcessData = (state: any) => {
  return {
    ...state,
    taskDetail: {},
    claimProcessData: {},
    showMappingModal: false,
    errorCodeMapMessageCode: '',
    processDetailList: [],
    activeKey: '0',
  };
};

export default clearClaimProcessData;
