import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {getParentMenu } from 'configuration/pages/ConfigurationCenter/Utils/Menu';

// 记录当前菜单的所有父级目录
export default function* ({ payload }: PayProps, { select, put }: SagaProps) {
  const { menu, currentMenu } = yield select((state: any) => state.configurationMenu);
  const menuRoot = getParentMenu(menu, currentMenu);
  yield put({
    type: 'save',
    payload: {
      menuRoot,
      ...payload,
    },
  });
}
