export default function* ({ payload }: any, { put }: any) {
  const { id } = payload;

  if (!id) return;

  yield put({
    type: 'removeClaimProcessDataUploadFiles',
    payload: {
      id,
    },
  });

  yield put({
    type: 'saveSnapShot',
  });
}
