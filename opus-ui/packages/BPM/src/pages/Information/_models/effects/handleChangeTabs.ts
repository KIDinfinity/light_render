import type { IEffects } from '../interfaces/index';

/**
 * tabs 切换的函数
 * @param tabs
 */
export default function* handleChangeTabs({ payload }: any, { put }: IEffects) {
  const { tabs } = payload;
  yield put({
    type: 'setTabs',
    payload: {
      tabs,
    },
  });

  yield put({
    type: 'loadFirstPage',
    payload: {
      tabs,
    },
  });
}
