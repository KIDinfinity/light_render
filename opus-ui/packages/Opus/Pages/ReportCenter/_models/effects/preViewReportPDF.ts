import lodash from 'lodash';
import { preViewReportPDF } from '@/services/owbReportCenterReportDownloadControllerService';

export default function* printReport(_, { call, select, put }: any) {
  const { printParams, statisticCodeList, isPrintTable, columnFieldList = [] } = yield select(
    (state: any) => ({
      printParams: state.reportCenterController?.printParams,
      statisticCodeList: state.reportCenterController?.statisticCodeList,
      isPrintTable: state.reportCenterController?.isPrintTable,
      columnFieldList:
        state.reportCenterController?.reportMetadata?.[state.reportCenterController.activeTabKey]
          ?.columnFieldList,
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
  const res = yield call(preViewReportPDF, params);
  if (res?.success) {
    yield put({
      type: 'savePdfData',
      payload: {
        pdfData: res.resultData,
      },
    });
  }
}
