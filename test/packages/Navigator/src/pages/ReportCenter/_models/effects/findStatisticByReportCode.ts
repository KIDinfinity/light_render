import { findStatisticByReportCode } from '@/services/owbReportCenterMetadataConfigControllerService';

export default function* (_: any, { call, put, select }: any) {
  const reportCode = yield select((state: any) => state?.reportCenterController?.activeTabKey);
  const response = yield call(findStatisticByReportCode, { reportCode });
  if (response?.success) {
    yield put({
      type: 'saveStatisticList',
      payload: response?.resultData,
    });
    yield put({
      type: 'batchSumUpStatistic',
    });
  }
}
