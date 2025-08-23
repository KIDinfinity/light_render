import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';

const useExpanderController = () => {
  const {
    activityTab,
    expanderToggle,
    siderToggle,
    showExpanderButton,
    expanderAvailable,
  } = useSelector(
    (state: any) => ({
      ...lodash.pick(state?.siderWorkSpace, [
        'activityTab',
        'expanderToggle',
        'siderToggle',
        'showExpanderButton',
        'expanderAvailable',
      ]),
    }),
    shallowEqual
  );
  return {
    isShowExpanderButton: showExpanderButton === 'show' && expanderAvailable === 'enabled',
    isExpanderSwitchOn: expanderToggle === 'on',
    isSiderToggleOn: siderToggle === 'on',
    is360: activityTab === SwitchDrawerTab.CustomerView,
  };
};

export default useExpanderController;
