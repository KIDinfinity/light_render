import lodash from 'lodash';
import type {
  PayProps,
  SagaProps,
  CurrentMenuProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { Tabs } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default [
  function* ({ payload }: PayProps, { put, select }: SagaProps) {
    const { functionId, functionCode } = payload;
    const { menuTemp, currentTab } = yield select((state: any) => ({
      ...state.configurationMenu,
      ...state.configurationTabs,
    }));
    const currentMenu =
      lodash.find(menuTemp, (el: CurrentMenuProps) => el.id === functionId) || {};

    yield put({
      type: 'save',
      payload: {
        currentMenu,
      },
    });

    yield put({
      type: 'configurationCenter/findFunction',
      payload: {
        functionId,
        functionCode,
      },
    });

    // 切换菜单到没版本控制时， 回到第一个tab
    if (currentTab !== Tabs[0]) {
      yield put({
        type: 'configurationTabs/changeCurrentTab',
        payload: {
          currentTab: Tabs[0],
          isTabSearch: false,
        },
      });
    }

    yield put({
      type: 'updateMenuRoot',
    });
  },
  { type: 'takeLatest' },
]
