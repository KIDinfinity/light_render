import lodash from 'lodash';

export default function* policyInfoRemoteAsyncEnd({ payload }: any, { put, select }: any) {
  const result = payload?.data;
  const failList = lodash
    .filter(result, (item) => !item.docUpdateFlag)
    .map((item) => {
      if (lodash.has(item, 'docUpdateFlag')) {
        delete item.docUpdateFlag;
      }
      return item;
    });
  yield put({
    type: 'getDocuments',
    payload: {},
  });
  if (lodash.isEmpty(failList)) {
    return { status: true };
  } else {
    return {
      status: false,
      failList,
    };
  }
}
