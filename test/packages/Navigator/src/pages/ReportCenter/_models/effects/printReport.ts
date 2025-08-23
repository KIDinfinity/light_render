import lodash from 'lodash';
import {
  downloadReport,
  downloadReportFromCache,
} from '@/services/owbReportCenterReportDownloadControllerService';
import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { formUtils } from 'basic/components/Form';

import getVisibleParams from '../../_utils/getVisibleParams';

export default function* printReport({ payload = {} }: any, { call, select }: any) {
  const { isFromDashboard = false, dashboardCode, linkedReportCode } = payload;
  const {
    reportMetadata,
    printParams,
    statisticCodeList,
    isPrintTable,
    columnFieldList = [],
    reportListMap,
    searchDefault,
    reportCode,
  } = yield select((state: any) => ({
    printParams: state.reportCenterController?.printParams,
    statisticCodeList: state.reportCenterController?.statisticCodeList,
    searchDefault: state.reportCenterController?.searchDefault,

    isPrintTable: state.reportCenterController?.isPrintTable,
    columnFieldList:
      state.reportCenterController?.reportMetadata?.[state.reportCenterController.activeTabKey]
        ?.columnFieldList,
    reportListMap: state.reportCenterController?.reportListMap,
    reportCode: state.reportCenterController?.activeTabKey,
    reportMetadata: state.reportCenterController?.reportMetadata,
  }));
  const isResultCacheDuration = reportMetadata?.[reportCode]?.resultCacheDuration;

  const functionData = {
    searchComponentList: reportMetadata[reportCode].searchFieldList,
  };
  const curSearchDefault = searchDefault?.[reportCode];

  const options = formUtils.cleanValidateData({
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
  const reportParams = {
    ...newParams,
    reportCode,
  };

  const reportColumns = lodash
    .chain(columnFieldList)
    .filter((columnField) => {
      return columnField.visible;
    })
    .map((item) => {
      return item.fieldName;
    })
    .value();
  const params = {
    statisticRequest: statisticCodeList,
    reportRequest: {
      ...(isResultCacheDuration ? reportParams : printParams),
      ...(isFromDashboard && linkedReportCode === reportCode
        ? { dashboardCode: dashboardCode }
        : {}),
    },
    printReport: isPrintTable,
    reportColumns,
  };
  yield call(isResultCacheDuration ? downloadReportFromCache : downloadReport, params);
  return { reportParams: printParams, reportName: reportListMap?.[reportCode]?.reportName };
}
