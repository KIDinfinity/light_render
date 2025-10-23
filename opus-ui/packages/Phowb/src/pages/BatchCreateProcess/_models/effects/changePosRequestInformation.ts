import lodash from 'lodash';

export default function* (action: any, { select, put }) {
  const { changedFields } = lodash.pick(action?.payload, ['changedFields']);
  const { policyInfo } = yield select((state) => ({
    policyInfo: state?.batchCreateProcess?.policyInfo,
  }));
  yield put({
    type: 'setPolicyInfo',
    payload: {
      policyInfo: {
        ...policyInfo,
        posRequestInformation: {
          ...policyInfo?.posRequestInformation,
          ...changedFields,
        },
      },
    },
  });
}
