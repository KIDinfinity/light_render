import { NAMESPACE } from '../../activity.config';

export default function* policyInfoRemoteAsyncEnd({ payload }: any, { put, select }: any) {
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );

  const { data } = payload;

  yield put({
    type: 'saveClaimProcessData',
    payload: {
      ...processData,
      policyInfo: data?.policyInfo,
      clientInfo: data?.clientInfo,
    },
  });
}
