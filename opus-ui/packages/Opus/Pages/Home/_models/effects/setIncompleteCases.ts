// 用户手动选中的cases，不调用接口
export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { list, currentPage } = payload || {};

  const params = {
    ...payload,
    todoCaseCount: 0,
    pendingCaseCount: 0,
    current: currentPage ? currentPage : 1,
  };

  if (list) {
    params.list = list;
    params.total = list.length;
  }

  yield put({
    type: 'saveIncompletedCases',
    payload: {
      incompleteCases: params,
    },
  });

  return true;
}
