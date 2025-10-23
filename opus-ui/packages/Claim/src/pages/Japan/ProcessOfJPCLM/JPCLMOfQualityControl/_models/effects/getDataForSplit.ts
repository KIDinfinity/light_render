export default function* (_: any, { select, put }: any) {
  const applicationList = yield select(
    (state: any) => state.JPCLMOfQualityController.applicationList
  );
  const claimProcessData = yield put.resolve({
    type: 'getClaimProcessData',
  });

  return {
    ...claimProcessData,
    applicationList,
  };
}
