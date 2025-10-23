import lodash from 'lodash';
import { downloadReportPDF } from '@/services/owbReportCenterReportDownloadControllerService';

export default function* printReportPDF(_, { call, select }: any) {
  const { printParams, statisticCodeList, isPrintTable, columnFieldList = [], reportListMap, reportCode } = yield select(
    (state: any) => ({
      printParams: state.reportCenterController?.printParams,
      statisticCodeList: state.reportCenterController?.statisticCodeList,
      isPrintTable: state.reportCenterController?.isPrintTable,
      columnFieldList:
        state.reportCenterController?.reportMetadata?.[state.reportCenterController.activeTabKey]
          ?.columnFieldList,
      reportListMap: state.reportCenterController?.reportListMap,
      reportCode: state.reportCenterController?.activeTabKey,
    })
  );
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
    reportRequest: printParams,
    printReport: isPrintTable,
    reportColumns,
  };
  yield call(downloadReportPDF, params);
  return { reportParams: printParams, reportName: reportListMap?.[reportCode]?.reportName }
}
