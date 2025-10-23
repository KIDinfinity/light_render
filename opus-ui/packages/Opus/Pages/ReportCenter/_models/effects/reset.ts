import { getSearchDefault } from 'configuration/pages/ConfigurationCenter/Utils/Search';

export default function* (_: any, { put, select }: any) {
  const { reportMetadata, reportCode } = yield select((state: any) => ({
    reportMetadata: state.reportCenterController?.reportMetadata,
    reportCode: state.reportCenterController?.activeTabKey,
  }));

  const searchDefault = getSearchDefault({
    searchComponentList: reportMetadata[reportCode]?.searchFieldList || [],
  });
  yield put({
    type: 'saveSearchDefault',
    payload: {
      searchDefault,
      reportCode,
    },
  });
  yield put({
    type: 'getReport',
    payload: {
      reportCode,
    },
  });
}
