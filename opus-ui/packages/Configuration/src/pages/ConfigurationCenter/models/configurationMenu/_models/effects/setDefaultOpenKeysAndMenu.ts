import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

  // 默认展开全部菜单
    // 默认选择第一个有子菜单的菜单
export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { defaultMenu, openKeys } = payload;
  const { id: functionId, functionCode, functionName } = defaultMenu;
  yield put({
    type: 'configurationCenter/findFunction',
    payload: {
      functionId,
      functionCode,
    },
  });

  yield put({
    type: 'save',
    payload: {
      currentMenu: defaultMenu,
      title: functionName,
      openKeys,
    },
  });

  yield put({
    type: 'updateMenuRoot',
  });
}
