import lodash from 'lodash';

export default function* (action: any, { put }) {
  const { mainData } = lodash.pick(action?.payload, ['mainData']);
  const { policyInfo, selectedTransactionTypes, processList } = lodash.pick(mainData, [
    'policyInfo',
    'selectedTransactionTypes',
    'processList',
  ]);
  yield put({
    type: 'setPolicyInfo',
    payload: {
      policyInfo,
    },
  });
  yield put({
    type: 'setSelectedTransactionTypes',
    payload: {
      selectedTransactionTypes,
    },
  });
  yield put({
    type: 'setProcessList',
    payload: {
      processList,
    },
  });
}
