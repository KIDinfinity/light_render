import lodash from 'lodash';
export default {
  namespace: 'advancedQueryAllForm',
  state: {
    currentTab: '2', // Task,
    searchForm: {},
    initData: {},
    searchStatus: true,
  },
  effects: {
    // 切换tab时保存
    *saveCurrentTab({ payload }: any, { put }: any) {
      yield put({
        type: 'saveTabReducer',
        payload: {
          currentTab: payload.currentTab,
        },
      });
    },
    // 搜索、排序、下一页时保存
    *saveCurrentSearch({ payload }: any, { select, put }: any) {
      const currentTab = yield select((state: any) => state.advancedQueryAllForm.currentTab);
      if (!lodash.isEmpty(payload?.searchForm)) {
        yield put({
          type: 'saveCurrentFormReducer',
          payload: {
            saveTabName: currentTab,
            searchForm: payload.searchForm,
          },
        });
      }
    },
    // 点击Reset按钮清除对应tab的搜索条件
    *clearCurrentForm(_: any, { select, put }: any) {
      const currentTab = yield select((state: any) => state.advancedQueryAllForm.currentTab);
      const oldSearchForm = yield select((state: any) => state.advancedQueryAllForm.searchForm);
      delete oldSearchForm[currentTab];
      yield put({
        type: 'clearCurrentFormReducer',
        payload: {
          searchForm: oldSearchForm,
        },
      });
    },
  },
  reducers: {
    resetInitData(state: any) {
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
          [state.currentTab]: state.initData?.[state.currentTab] || null,
        },
      };
    },
    saveInitDataAddData(state: any, { payload }: any) {
      const { saveTabName, params } = payload;
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
          [saveTabName]: {
            params: { ...state.initData?.[saveTabName]?.params, ...params },
          },
        },
      };
    },
    saveInitData(state: any, { payload }: any) {
      const { data } = payload;
      return {
        ...state,
        searchForm: data,
        initData: data,
      };
    },
    saveTabReducer(state: any, { payload }: any) {
      const { currentTab } = payload;
      return {
        ...state,
        currentTab,
      };
    },
    saveCurrentFormReducer(state: any, { payload }: any) {
      const { saveTabName, searchForm } = payload;
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
          [saveTabName]: searchForm,
        },
      };
    },
    saveSearchStatus(state: any, { payload }: any) {
      const { searchStatus } = payload;
      return {
        ...state,
        searchStatus: searchStatus,
      };
    },
    clearCurrentFormReducer(state: any, { payload }: any) {
      const { searchForm } = payload;
      return {
        ...state,
        searchForm,
      };
    },
    clearAllReducer(state: any) {
      return {
        ...state,
        currentTab: null, // 因为在高级查询时会触发一次初始化查询，导致数据保存，所以更改tab为null
        searchForm: {},
      };
    },
  },
};
