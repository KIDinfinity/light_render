import lodash from 'lodash';
import { Print } from 'navigator/pages/ReportCenter/_utils/utils';
import getListReports from './getListReports';
import findReportMetadata from './findReportMetadata';
import getReport from './getReport';
import listAllSearchFieldValues from './listAllSearchFieldValues';
import batchSumUpStatistic from './batchSumUpStatistic';
import reset from './reset';
import updateStatistic from './updateStatistic';
import removeStatistic from './removeStatistic';
import findStatisticByReportCode from './findStatisticByReportCode';
import printReport from './printReport';
import printReportPDF from './printReportPDF';
import preViewReportPDF from './preViewReportPDF';
import sendPDF from './sendPDF';
import findStorage from './findStorage';

export default {
  *print({ payload }: any, { select, put }: any) {
    const reportData = yield put.resolve({
      type: 'getReportData',
      payload,
    });
    const reportDisplayName = yield select(
      (state: any) => state.reportCenterController.reportDisplayName
    );
    const { headers, data } = lodash.get(reportData, 'rows[0]', {}) || {};
    const printUtils = new Print();
    printUtils.printExcelFn({
      worksheetName: reportDisplayName,
      headerInfo: headers,
      bodyInfo: data,
      fileName: reportDisplayName,
    });
  },
  getListReports,
  findReportMetadata,
  getReport,
  reset,
  listAllSearchFieldValues,
  batchSumUpStatistic,
  updateStatistic,
  removeStatistic,
  findStatisticByReportCode,
  printReport,
  printReportPDF,
  preViewReportPDF,
  sendPDF,
  findStorage,
};
