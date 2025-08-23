import lodash from 'lodash';

export default [
  function* ({ payload }: PayProps, { put, select }: SagaProps) {
    const { functionId, functionCode } = payload;
    const { menuTemp, menu, openKeys } = yield select((state: any) => ({
      ...state.configurationController,
    }));
    const currentMenu = lodash.find(menuTemp, (el: CurrentMenuProps) => el.id === functionId) || {};
    yield put({
      type: 'saveMenu',
      payload: {
        menu,
        menuTemp,
        currentMenu,
        openKeys,
      },
    });
    yield put({
      type: 'getFunction',
      payload: {
        functionId,
        functionCode,
      },
    });
  },
  { type: 'takeLatest' },
];
