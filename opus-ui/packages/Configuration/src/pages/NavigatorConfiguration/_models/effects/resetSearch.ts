export default function* ({payload}: any, { put,select }: any) {
  const {functionCode}=payload;
  const searchDefaultTemp = yield select((state: any) => state.configurationController.searchDefaultTemp);
  yield put({
    type: 'saveResetLoading',
    payload: {
      resetLoading: true,
    },
  });
  yield put({
    type: 'saveSearchDefaultTemp',
    payload: {
      searchDefaultTemp: {
        ...searchDefaultTemp,
        [functionCode]:{}
      },
    },
  });
  yield put({
    type: 'saveSearchDefault',
    payload: {
      searchDefault: {},
    },
  });
  yield put.resolve({
    type: 'listPage',
  });
  yield put({
    type: 'saveResetLoading',
    payload: {
      resetLoading: false,
    },
  });
}
