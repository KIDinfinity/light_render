import lodash from 'lodash';
import dcHomePageCaseDataCallService from '@/services/dcHomePageCaseDataCallService';

export default {
  namespace: 'overdueList',

  state: {
    list: [],
    index: 0,
    currentList: [],
    length: 0,
  },

  effects: {
    *getOverdueList({ payload }, { put, call }) {
      const { taskNum = 3 } = payload;

      const response = yield call(dcHomePageCaseDataCallService.getOverDueTasks, payload);

      yield put({
        type: 'save',
        payload: {
          list: response.resultData,
          taskNum,
        },
      });
    },
    *getOverdueNum({ payload }, { select, put }) {
      const list = yield select((state: any) => state.overdueList.list);
      const { taskNum } = payload;
      const concatList = list.reduce((prev, num) => {
        return prev.concat(num);
      }, []);
      yield put({
        type: 'save',
        payload: {
          list: concatList,
          taskNum,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      const { list, taskNum = 3 } = payload;
      const chunk = lodash.chunk(list, taskNum);
      return {
        ...state,
        ...{
          list: chunk,
          index: 0,
          currentList: chunk[0] || [],
          length: list?.length || 0,
        },
      };
    },
    previous(state) {
      const { list, index } = state;
      const currentList = list[index - 1];
      return {
        ...state,
        ...{
          currentList,
          index: index - 1,
        },
      };
    },
    next(state) {
      const { list, index } = state;
      const currentList = list[index + 1];
      return {
        ...state,
        ...{
          currentList,
          index: index + 1,
        },
      };
    },
  },
};
