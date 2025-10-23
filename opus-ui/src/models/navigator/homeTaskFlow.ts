import lodash from 'lodash';
import navigatorHomePageCaseDataCallService from '@/services/navigatorHomePageCaseDataCallService';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default {
  namespace: 'homeTaskFlow',

  state: {
    lineData: [],
    params: {},
    flowData: [],
    currentCaseCategory: {},
    isShowFlowDetails: false,
    flowDetailsId: 0,
    flowItemTooltip: {},
  },

  effects: {
    *flowInit({ signal = null }, { put }) {
      yield put({
        type: 'homeTaskFlowFilter/filterInit',
        signal,
      });
    },
    *flowChange({ signal = null }, { put, select, take }) {
      yield put({ type: 'parseFiltersToParams' });
      yield take('saveParams');

      const params = yield select((state) => state.homeTaskFlow.params);

      yield put({
        type: 'task/taskCountByActivity',
        payload: params,
        signal,
      });
    },
    *parseFiltersToParams(_, { put, select }) {
      const filters = yield select((state) => state.homeTaskFlowFilter.filters);

      const params = {};

      if (filters.taskStatus === 'all') {
        params.taskStatus = ['todo', 'pending'];
      } else if (['todo', 'pending'].includes(filters.taskStatus)) {
        params.taskStatus = [filters.taskStatus];
      }

      const assigneeList = yield select((state) => state.homeTaskFlowFilter.assigneeList);

      const userId = yield select((state) => state.user.currentUser.userId);
      if (filters.assignee === 'all') {
        params.assignees = assigneeList.length
          ? assigneeList.map((item) => item?.userId || item)
          : [userId];
      } else if (lodash.isString(filters.assignee)) {
        params.assignees = [filters.assignee];
      } else {
        params.assignees = [userId];
      }

      yield put({
        type: 'saveParams',
        payload: {
          params,
        },
      });
    },
    *fetchFlowData({ payload, signal = null }, { put, call, select }) {
      const response = yield call(
        navigatorHomePageCaseDataCallService.getProcessInfoByOrgMemberList,
        payload,
        { signal }
      );
      if (response?.success) {
        const currentUser = yield select((state) => state.user.currentUser);
        const organizationMemberList = yield select(
          (state) => state.homeTaskFlowFilter?.organizationMemberList
        );
        const filters = yield select((state) => state.homeTaskFlowFilter?.filters);
        /**
         *  有流程，但是没节点， 不展示 @kiko
         *  有流程，节点，没任务，展示
         */
        const resultData = lodash
          .unionBy(response?.resultData, 'caseCategory')
          ?.filter((el) => el?.activityColorList?.length)
          ?.map?.((item) => ({
            ...item,
            caseCategoryName: formatMessageApi({
              Label_BPM_CaseCategory: item.caseCategory,
            }),
          }));

        let posiSelected = resultData.findIndex(flow => flow.selected);
        if(posiSelected === -1) {
          posiSelected = 0;
        }

        const currentCaseCategory = resultData?.[posiSelected];
        yield put({
          type: 'process/activities',
          payload: {
            assignee: currentUser?.userId,
            caseCategory: currentCaseCategory?.caseCategory,
            organizationMemberList: filters.assignee === 'all' ? organizationMemberList : [],
            processDefId: currentCaseCategory?.processDefId,
          },
          signal,
        });

        yield put({
          type: 'saveCurrentCaseCategory',
          payload: {
            currentCaseCategory,
          },
        });

        yield put({
          type: 'saveFlowData',
          payload: {
            flowData: resultData,
          },
        });
      }
    },
  },
  reducers: {
    saveParams(state, action) {
      const {
        payload: { params },
      } = action;

      return {
        ...state,
        params,
      };
    },
    saveFlowData(state, { payload }) {
      const { flowData } = payload;

      return {
        ...state,
        flowData,
      };
    },
    saveCurrentCaseCategory(state, { payload }) {
      const { currentCaseCategory } = payload;
      return {
        ...state,
        currentCaseCategory,
      };
    },
    showFlowDetail(state) {
      return {
        ...state,
        isShowFlowDetails: true,
      };
    },
    closeFlowDetail(state) {
      return {
        ...state,
        isShowFlowDetails: false,
      };
    },
    getFlowDetailRequestParams(state, action) {
      return {
        ...state,
        flowDetailsId: action.payload,
      };
    },
    changeFlowItemTooltip(state, { payload }) {
      return {
        ...state,
        flowItemTooltip: payload,
      };
    },
  },
};
