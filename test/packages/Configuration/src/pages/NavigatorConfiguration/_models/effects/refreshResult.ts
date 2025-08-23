export default function* refreshResult({ payload = {} }: PayProps, { put, select }: SagaProps) {
  const {
    searchDefault: { params, pagination, sortOrders },
    currentMenu: { id: functionId, functionCode },
  } = yield select((state: any) => ({
    ...state.configurationController,
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
