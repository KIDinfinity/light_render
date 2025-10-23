import lodash from 'lodash';

export default function* (action: any, { put, select }) {
  const removeId = lodash.get(action, 'payload.removeId[0]');
  const { processList, selectedTransactionTypes } = yield select((state) => ({
    processList: state?.batchCreateProcess?.processList,
    selectedTransactionTypes: state?.batchCreateProcess?.selectedTransactionTypes,
  }));

  const newList = lodash
    .chain(processList)
    .filter((item) => item.id != removeId)
    .filter((item) => selectedTransactionTypes.includes(item.id))
    .uniqBy('id')
    .value();
  yield put({
    type: 'setProcessList',
    payload: {
      processList: newList,
    },
  });
}
