import navigator from 'navigator/api';

export default (state: any) => {
  navigator.SiderWorkSpaceController.send({
    type: 'turnOffSider',
  });
  return {
    ...state,
    isSwitchOn: false,
  };
};
