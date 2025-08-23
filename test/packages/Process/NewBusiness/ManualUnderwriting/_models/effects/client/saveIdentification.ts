export default function* ({ payload }: any, { put }: any): Generator<any, void, any> {
  const { businessDataForFe , businessDataForBe, updateModalType } = payload;
  yield put({
    type: 'saveProcessData',
    payload: {
      businessData: businessDataForFe,
    },
  });

  yield put({
    type: `saveShowModal`,
    payload: {
      type: updateModalType,
    },
  })

  yield put({
    type: 'claimCaseController/saveSnapshot',
    payload: {
      postData: businessDataForBe,
    },
  });
}
