import {
  addStatistic,
  updateStatistic,
} from '@/services/owbReportCenterMetadataConfigControllerService';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default function* (_: any, { call, select, put }: any) {
  const { statisticCode, reportCode, covariance } = yield select((state: any) => ({
    statisticCode: state.reportCenterController?.statisticCode,
    reportCode: state.reportCenterController?.activeTabKey,
    covariance: state.reportCenterController?.covariance,
  }));
  const params = {
    reportCode,
    statisticCode,
    ...formUtils.cleanValidateData(covariance),
  };
  params.groupByField = lodash.join(params.groupByField, ',');
  const fetch = statisticCode ? updateStatistic : addStatistic;
  const response = yield call(fetch, params);
  if (response?.success) {
    yield put({
      type: 'clearCovariance',
    });
    yield put({
      type: 'findStatisticByReportCode',
    });
  }
}
