import navigator from 'navigator/api';

export default (state: any) => {
  navigator.SiderWorkSpaceController.send({
    type: 'turnOffSider',
  });
  return {
    ...state,
    isSwitchOn: false,
    isShow: {
      isShowAI: false,
      isShowChat: false,
      isShowRemark: false,
      isShowPending: false,
      isShow360: false,
      isShowTools: false,
      isShowIntegration: false,
    },
  };
};
