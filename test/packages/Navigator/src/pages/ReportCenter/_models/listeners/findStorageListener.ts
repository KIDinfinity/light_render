export default function* findStorageListener({ payload }: any, { put, takeLatest, select }: any) {
  yield takeLatest(
    ['reportCenterController/saveSearchDefault'],
    function* action({ payload }: any) {
      const { reportMetadata, reportCode } = yield select((state: any) => ({
        reportMetadata: state.reportCenterController?.reportMetadata,
        reportCode: state.reportCenterController?.activeTabKey,
      }));
      const isResultCacheDuration = reportMetadata?.[reportCode]?.resultCacheDuration;

      if (isResultCacheDuration) {
        yield put({
          type: 'reportCenterController/findStorage',
        });
      }
    }
  );
}
