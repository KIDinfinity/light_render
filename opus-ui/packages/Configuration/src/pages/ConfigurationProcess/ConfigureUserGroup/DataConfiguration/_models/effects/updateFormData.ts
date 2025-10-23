export default [
  function* ({ payload = {} }: any, { put }: any) {
    const { formData, isUpdateSubSection = false } = payload;
    yield put({
      type: 'saveFormData',
      payload: {
        formData: { ...formData },
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
