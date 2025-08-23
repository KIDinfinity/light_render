
export default function* liteDataRemoteAsyncEnd({ payload }: any, { put, select }: any) {
  yield put({ type: 'saveClaimProcessData', payload });
}
