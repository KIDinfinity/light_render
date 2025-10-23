import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { listMenu } from '@/services/ccFunctionControllerService';
import { handleMenu } from 'configuration/pages/ConfigurationCenter/Utils/Menu';

// 菜单展开
export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const response = yield call(listMenu, payload);
  if (response && response.success) {
    const { menuTemp, menu, defaultMenu, openKeys } = handleMenu(
      response.resultData.subFunctionList
    );

    yield put({
      type: 'saveMenu',
      payload: {
        menu,
        menuTemp,
        openKeys,
      },
    });

    yield put({
      type: 'setDefaultOpenKeysAndMenu',
      payload: {
        defaultMenu,
        openKeys,
      },
    });
  }
}
