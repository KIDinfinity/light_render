import lodash from 'lodash';

export default (state: any, action: any) => {
  const { name, switchIdx } = action.payload;
  const isShow = lodash.cloneDeep(state.isShow);
  lodash.forEach(isShow, (value, key) => {
    isShow[key] = false;
  });

  switch (name) {
    case 'basicInfo':
      isShow.isShowBasic = true;
      break;
    case 'permission':
      isShow.isShowPermission = true;
      break;
    case 'performance':
      isShow.isShowPerformance = true;
      break;
    case 'customization':
      isShow.isShowCustomization = true;
      break;
    default:
      break;
  }

  return {
    ...state,
    isShow,
    switchIdx,
  };
};
