import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

    // 刷新当前页面
export default function* ({ payload = {} }: PayProps, { put, select }: SagaProps) {
  const {
    searchDefault: { params, pagination, sortOrders },
    currentMenu: { id: functionId, functionCode },
  } = yield select((state: any) => ({
    ...state.configurationCenter,
    ...state.configurationMenu,
  }));
  yield put({
    type: 'listPage',
    payload: {
      functionId,
      functionCode,
      ...pagination,
      params,
      sortOrders,
      ...payload,
    },
  });
}
