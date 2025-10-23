export default function* logEnvoy({ payload }: any, { put }: any) {
  const { action, caseNo, currentActivityKey, desc, extraData } = payload;
  if (!desc || !action) return;
  yield put({
    type: 'addAuditLog',
    payload: {
      action,
      processInstanceId: caseNo,
      procActivityKey: currentActivityKey,
      desc,
      extraData,
    },
  });
}
