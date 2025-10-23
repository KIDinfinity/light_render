import lodash from 'lodash';
import integrationReportCenterControllerService from '@/services/integrationReportCenterControllerService';
import {
  getCurrentTabFieldsVal,
  getSortOrderStr,
  Print,
} from 'navigator/pages/ReportCenter/_utils/utils';

interface IEffects {
  put?: any;
  call?: Function;
  select?: Function;
}

export default {
  *findDictionaryByTypeCodes(_: any, { put }: IEffects) {
    // 后端没空，临时方案，下周删除
    const response = yield put.resolve({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Label_BPM_CaseCategory', 'APDAClaimType'],
    });
    yield put({
      type: 'saveDictionaryByTypeCodes',
      payload: {
        caseCategory: lodash.get(response, 'resultData.Label_BPM_CaseCategory', []),
        APDAClaimType: lodash.get(response, 'resultData.APDAClaimType', []),
      },
    });
  },
  *getReportList(_: any, { call, put }: IEffects) {
    const response = yield call(integrationReportCenterControllerService.getReportList, {
      params: { type: 1 },
    });
    if (lodash.get(response, 'success')) {
      yield put({
        type: 'saveReportList',
        payload: {
          reportList: lodash.get(response, 'resultData.rows'),
        },
      });
    }
  },
  *getReportData({ payload }: any, { select, call }: IEffects) {
    const { reportId, pageNum, pageSize, sortName, sortOrder, currentTabFieldsVal, type } = payload;
    const reportData = yield select((state: any) => state.reportCenterOldController.reportData);
    const isPrint = type === 'print';
    const searchParams: any = {
      currentPage: isPrint ? 1 : pageNum || 1,
      pageSize: !isPrint
        ? pageSize || lodash.get(reportData, `${reportId}.pageSize`, 10)
        : 999999999,
      sortName: sortName || null,
      sortOrder: sortOrder || null,
      params: {
        reportId,
        ...currentTabFieldsVal,
      },
    };
    const response = yield call(integrationReportCenterControllerService.search, searchParams);
    if (
      lodash.isPlainObject(response) &&
      response.success &&
      lodash.isPlainObject(response.resultData)
    ) {
      return response.resultData;
    }
    return {};
  },
  *search({ payload }: any, { put }: IEffects) {
    const { reportId } = payload;
    const reportData = yield put.resolve({
      type: 'getReportData',
      payload,
    });
    yield put({
      type: 'saveReportData',
      payload: {
        reportId,
        reportData,
      },
    });
  },
  *print({ payload }: any, { select, put }: IEffects) {
    const reportData = yield put.resolve({
      type: 'getReportData',
      payload,
    });
    const reportDisplayName = yield select(
      (state: any) => state.reportCenterOldController.reportDisplayName
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
  *changeTable({ payload }: any, { select, put }: IEffects) {
    const { page, sorter } = payload;
    const { form, reportData, activeTabKey } = yield select((state: any) => ({
      form: state.reportCenterOldController.form,
      reportData: state.reportCenterOldController.reportData,
      activeTabKey: state.reportCenterOldController.activeTabKey,
    }));
    const currentTabFieldsVal = getCurrentTabFieldsVal(form, activeTabKey);
    const pageSize = lodash.get(page, 'pageSize');
    let current = lodash.get(page, 'current');

    let sortName: string | null = null;
    let sortOrder: string | null = null;
    if (lodash.isPlainObject(sorter) && !lodash.isEmpty(sorter)) {
      sortName = lodash.get(sorter, 'column.sorter', null);
      const order = lodash.get(sorter, 'order', null);
      sortOrder = order ? getSortOrderStr(order) : order;
    }

    const {
      pageSize: currentPageSize,
      sortName: currentSortName,
      sortOrder: currentSortOrder,
    } = lodash.pick(lodash.get(reportData, `${activeTabKey}`, {}), [
      'pageSize',
      'sortName',
      'sortOrder',
    ]);
    if (
      pageSize !== currentPageSize ||
      sortName !== currentSortName ||
      sortOrder !== currentSortOrder
    ) {
      current = 1;
    }

    yield put({
      type: 'search',
      payload: {
        pageNum: current,
        pageSize,
        sortName,
        sortOrder,
        reportId: activeTabKey,
        currentTabFieldsVal,
      },
    });
  },
};
