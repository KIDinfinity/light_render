import lodash from 'lodash';
import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import {
  sumUpStatisticByReportCode,
} from '@/services/owbReportCenterReportControllerService';
import { formUtils } from 'basic/components/Form';
import getVisibleParams from '../../_utils/getVisibleParams';
import { transferStatisticInfo } from '../../_utils/getStasticFormat';

export default function* ({ payload = {} }: any, { call, select, put }: any) {
  const { isFromDashboard = false, dashboardCode } = payload;
  const { reportMetadata, searchDefault, reportCode, statisticMetadataList } = yield select(
    (state: any) => ({
      reportMetadata: state.reportCenterController?.reportMetadata,
      searchDefault: state.reportCenterController?.searchDefault,
      reportCode: state.reportCenterController?.activeTabKey,
      statisticMetadataList:
        state?.reportCenterController?.reportMetadata?.[reportCode]?.statisticMetadataList,
    })
  );

  const curSearchDefault = searchDefault?.[reportCode];
  const functionData = {
    searchComponentList: reportMetadata[reportCode].searchFieldList,
  };
  const options = formUtils.cleanValidateData({
    ...payload,
    params: getVisibleParams({
      searchFields: reportMetadata[reportCode]?.searchFieldList,
      params: {
        ...(curSearchDefault?.params || {}),
      },
      overrideVisible: !!isFromDashboard,
    }),
  });

  const newParams = handlerSearchParams(
    {
      ...options,
    },
    functionData
  );
  const extraParams = isFromDashboard ? { dashboardCode } : {};
  const statisticParams = {
    whereConditions: newParams.whereConditions,
    reportCode,
    ...extraParams,
  };
  const response = yield call(sumUpStatisticByReportCode, statisticParams);
  if (response?.success) {
    const batchSumUpStatistic = response?.resultData;
    const newBatchSumUpStatistic = transferStatisticInfo(
      batchSumUpStatistic,
      reportMetadata[reportCode]?.columnFieldList,
      reportMetadata?.[reportCode]?.statisticMetadataList
    );
    const codeList = lodash.keys(newBatchSumUpStatistic) || [];
    yield put({
      type: 'saveBatchSumUpStatistic',
      payload: {
        batchSumUpStatistic: batchSumUpStatistic ? newBatchSumUpStatistic : batchSumUpStatistic,
      },
    });
    if (lodash.size(codeList)) {
      yield put({
        type: 'saveStatisticCodeList',
        payload: { statisticCodeList: codeList },
      });
    }
  }
}
