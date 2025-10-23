export default (state: any) => ({
  ...state,
  isSwitchOn: true,
  isShow: {
    isShowAI: true,
    isShowChat: false,
    isShowRemark: false,
    isShowPending: false,
    isShow360: false,
  },
});
