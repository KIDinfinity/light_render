import { produce } from 'immer';

export default {
  saveSwitchTabLoading(state: any, { payload }: any) {
    return {
      ...state,
      switchTabLoading: payload.switchTabLoading,
    };
  },
  saveReportList(state: any, { payload }: any) {
    return {
      ...state,
      reportList: payload.reportList,
    };
  },
  saveForm(state: any, { payload }: any) {
    return {
      ...state,
      form: payload.form,
    };
  },
  saveActiveTabInfo(state: any, { payload }: any) {
    return {
      ...state,
      activeTabKey: payload.activeTabKey,
      reportDisplayName: payload.reportDisplayName,
    };
  },
  saveReportData(state: any, { payload }: any) {
    const { reportId, reportData } = payload;
    return produce(state, (draft: any) => {
      draft.reportData[reportId] = reportData;
    });
  },
  saveDictionaryByTypeCodes(state: any, { payload }: any) {
    return {
      ...state,
      caseCategory: payload.caseCategory,
      APDAClaimType: payload?.APDAClaimType,
    };
  },
};
