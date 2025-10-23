import { taskData } from '@/services/ccJpDataControllerService';

export default [
  function* ({ payload }: any, { put, call, select }: any) {
    const { currentMenu } = yield select((state: any) => ({
      currentMenu: state.configurationController?.currentMenu,
    }));
    const response = yield call(taskData, {
      functionCode: currentMenu?.functionCode,
      functionId: currentMenu?.id,
      caseNo: payload?.case_no,
      orderConditions: [],
      whereConditions: [],
      page: {
        currentPage: 1,
        firstResult: 0,
        offset: 0,
        pageSize: 99999,
        params: {},
        rows: [],
        sortName: '',
        sortOrder: '',
        startPage: 0,
        total: 0,
        totalPage: 0,
      },
    });
    if (response?.success) {
      yield put({
        type: 'saveUnderAuditData',
        payload: {
          underAuditData: response?.resultData?.rows?.[0] || {},
        },
      });
    }
  },
];
