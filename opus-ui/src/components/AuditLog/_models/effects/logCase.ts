export default function* logCase({ payload }: any, { select, put }: any) {
  const { action, processInstanceId, procActivityKey } = payload;
  if (!action) return;
  yield put({
    type: 'addAuditLog',
    payload: {
      action,
      processInstanceId,
      procActivityKey,
    },
  });
}
