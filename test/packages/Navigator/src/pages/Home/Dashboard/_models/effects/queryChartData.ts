import { queryChartData } from '@/services/owbReportCenterDashboardControllerService';
import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import { safeParseUtil } from '@/utils/utils';
import { getChartData } from '../function';
import lodash from 'lodash';

export default function* ({ payload }: any, { put, select, call }: any) {
  const { dashboardCode, backUpData, needCloseFilter } = payload;

  const forms = yield select((state: any) => state.dashboardController.forms);

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: [forms?.[dashboardCode]],
  });

  if (errors?.length) {
    return false;
  }
  const { searchDatas, dashboardSearchFieldList, miscType, xAxisFormat, chartType } = yield select(
    (state: any) => state.dashboardController.chartListMap?.[dashboardCode]
  ) || backUpData;

  const params = lodash.omit(
    formUtils.queryValue({
      ...(searchDatas || {}),
      submission_date: formUtils.queryValue(searchDatas?.submission_date),
    }),
    'defaultCondition'
  );

  const searchParams = handlerSearchParams(
    {
      params,
    },
    {
      searchComponentList: dashboardSearchFieldList,
    }
  );

  const response = yield call(queryChartData, {
    dashboardCode,
    whereConditions: searchParams.whereConditions,
    defaultCondition: lodash.get(searchDatas, 'defaultCondition') || 'Y',
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
        chartData: { ...newChartData, temporarySearchFilter: searchDatas },
      },
    });
  } else if (!response?.success) {
    handleMessageModal(response?.promptMessages);
    yield put({
      type: 'saveChartData',
      payload: {
        dashboardCode,
        chartData: { ...backUpData, temporarySearchFilter: searchDatas },
      },
    });
  }
  if (needCloseFilter) {
    yield put({
      type: 'setOpenFilter',
      payload: {
        dashboardCode,
        isOpen: false,
      },
    });
  }
  return true;
}
