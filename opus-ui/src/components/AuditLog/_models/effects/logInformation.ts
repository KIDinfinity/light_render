export default function* logInformation({ payload }: any, { put }: any) {
  const {
    action,
    category,
    processInstanceId,
    procActivityKey,
    taskId,
    inquiryBusinessNo,
    businessNo,
    content,
  } = payload;
  if (!category || !action) return;
  yield put({
    type: 'addAuditLog',
    payload: {
      action,
      category,
      taskId,
      processInstanceId,
      procActivityKey,
      inquiryBusinessNo,
      businessNo,
      activityKey: procActivityKey,
      content,
    },
  });
}
