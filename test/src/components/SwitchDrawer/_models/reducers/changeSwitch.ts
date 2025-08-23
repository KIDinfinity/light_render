import loadsh from 'lodash';
import navigator from 'navigator/api';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';

export default (state: any, action: any) => {
  const name = loadsh.get(action, 'payload.name');
  navigator.SiderWorkSpaceController.send(name);
  navigator.SiderWorkSpaceController.send('turnOnSider');

  return {
    ...state,
    isSwitchOn: true,
    isShow: {
      isShowAI: name === SwitchDrawerTab.SmartCircle,
      isShowChat: name === SwitchDrawerTab.Chat,
      isShowRemark: name === SwitchDrawerTab.Remark,
      isShowPending: name === SwitchDrawerTab.Pending,
      isShow360: name === SwitchDrawerTab.CustomerView,
      isShowTools: name === SwitchDrawerTab.Tools,
      isShowIntegration: name === SwitchDrawerTab.Integration,
    },
  };
};
