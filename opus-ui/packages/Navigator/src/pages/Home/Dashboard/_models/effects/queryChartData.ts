import { queryChartData } from '@/services/owbReportCenterDashboardControllerService';
import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import { safeParseUtil } from '@/utils/utils';
import { getChartData } from '../function';

export default function* ({ payload }: any, { put, select, call }: any) {
  const { dashboardCode } = payload;
  const { searchDatas, dashboardSearchFieldList, miscType, xAxisFormat, chartType } = yield select(
    (state: any) => state.dashboardController.chartListMap?.[dashboardCode]
  );

  const searchParams = handlerSearchParams(
    {
      params: formUtils.queryValue(searchDatas),
    },
    {
      searchComponentList: dashboardSearchFieldList,
    }
  );

  const response = yield call(queryChartData, {
    dashboardCode,
    whereConditions: searchParams.whereConditions,
  });

  if (response?.success && response?.resultData?.chartData) {
    const newChartData = getChartData({
      miscType,
      chartData: safeParseUtil(response?.resultData?.chartData),
      xAxisFormat,
      chartType,
    });
    yield put({
      type: 'saveChartData',
      payload: {
        dashboardCode,
        chartData: newChartData,
      },
    });
  } else if (!response?.success) {
    handleMessageModal(response?.promptMessages);
  }
}
