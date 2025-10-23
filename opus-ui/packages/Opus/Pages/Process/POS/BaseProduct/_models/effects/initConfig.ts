interface IParams {
  payload: {
    caseCategory: string;
    activityCode: string;
  };
}

export default function* ({ payload }: IParams, { put }: any) {
  const { caseCategory, activityCode } = payload || {};

  yield put({
    type: 'atomConfig/loadSection',
    payload: {
      caseCategory,
      activityCode,
    },
  });
}
