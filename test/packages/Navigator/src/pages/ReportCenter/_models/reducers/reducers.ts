import saveReportMetadata from './saveReportMetadata';
import saveSearchDefault from './saveSearchDefault';
import saveReport from './saveReport';
import clear from './clear';
import saveSearchFieldList from './saveSearchFieldList';
import saveCollapse from './saveCollapse';
import saveCovariance from './saveCovariance';
import clearCovariance from './clearCovariance';
import saveStatisticCode from './saveStatisticCode';
import saveBatchSumUpStatistic from './saveBatchSumUpStatistic';
import saveActiveStatisticCard from './saveActiveStatisticCard';
import saveStatisticList from './saveStatisticList';
import saveColumnFieldList from './saveColumnFieldList';
import saveForm from './saveForm';
import clearReport from './clearReport';
import savePreviewModal from './savePreviewModal';
import savePdfData from './savePdfData';
export default {
  saveFindStorage(state: any, { payload }: any) {
    return {
      ...state,
      findStorage: payload.findStorage,
    };
  },
  saveClickTab(state: any, { payload }: any) {
    return {
      ...state,
      clickdTab: payload.clickdTab,
    };
  },
  saveReportList(state: any, { payload }: any) {
    return {
      ...state,
      reportListMap: payload,
    };
  },
  saveActiveTabInfo(state: any, { payload }: any) {
    return {
      ...state,
      activeTabKey: payload.activeTabKey,
    };
  },
  saveStatisticCodeList(state: any, { payload }: any) {
    return {
      ...state,
      statisticCodeList: payload.statisticCodeList,
    };
  },
  changeTableSwitch(state: any, { payload }: any) {
    return {
      ...state,
      isPrintTable: payload.isPrintTable,
    };
  },
  savePrintParams(state: any, { payload }: any) {
    return {
      ...state,
      printParams: payload.printParams,
    };
  },
  saveReportMetadata,
  saveSearchDefault,
  saveReport,
  clear,
  saveSearchFieldList,
  saveCollapse,
  saveCovariance,
  clearCovariance,
  saveStatisticCode,
  saveBatchSumUpStatistic,
  saveActiveStatisticCard,
  saveStatisticList,
  saveColumnFieldList,
  saveForm,
  clearReport,
  savePreviewModal,
  savePdfData,
};
