import dcHomePageCaseDataCallService from '@/services/dcHomePageCaseDataCallService';

export default {
  namespace: 'flowDetailError',

  state: {
    errorTasks: [],
    page: 0,
  },

  effects: {
    *getErrorTasks({ payload }, { call, put }) {
      const response = yield call(dcHomePageCaseDataCallService.getErrorTasks, payload);
      yield put({
        type: 'errorTasks',
        payload: response.resultData,
      });
    },
  },

  reducers: {
    errorTasks(state, action) {
      return {
        ...state,
        errorTasks: [...action.payload],
        page: 0,
      };
    },
    nextPage(state) {
      return {
        ...state,
        page: state.page + 1,
      };
    },
    prePage(state) {
      return {
        ...state,
        page: state.page - 1,
      };
    },
    resetPage(state) {
      return {
        ...state,
        page: 0,
      };
    },
  },
};
