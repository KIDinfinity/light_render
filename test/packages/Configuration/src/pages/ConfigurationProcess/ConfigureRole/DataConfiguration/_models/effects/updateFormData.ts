export default [
  function* ({ payload = {} }: any, { put, select }: any) {
    const { formData, isUpdateSubSection = false } = payload;
    const newFormData = formData;
    yield put({
      type: 'saveFormData',
      payload: {
        formData: newFormData,
      },
    });

    yield put({
      type: 'updateMultiple',
      payload: {
        isUpdateSubSection,
      },
    });
  },
  { type: 'takeLatest' },
];
