import { sendReport } from '@/services/owbReportCenterReportDownloadControllerService';
export default function* printReport(_, { call, select, put }: any) {
  const { pdfData } = yield select((state: any) => ({
    pdfData: state.reportCenterController?.pdfData,
  }));
  return yield call(sendReport, pdfData);
}
