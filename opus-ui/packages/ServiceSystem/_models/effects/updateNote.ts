export default function* updateNote({ payload }: any, { put }: any) {
  const { type } = payload;

  switch (type) {
    case 501:
      yield put({
        type: 'getServiceDownInfo',
      });
      break;
    case 502:
      yield put({
        type: 'getCancelServiceDownNotice',
      });

      break;

    default:
      break;
  }
  yield put({
    type: 'saveMessageType',
    payload: {
      messageType: type,
    },
  });
}
