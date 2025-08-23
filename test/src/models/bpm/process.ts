import { resRevert } from '@/utils/transform';
import bpmBusinessProcessService from '@/services/bpmBusinessProcessService';
import dcHomePageCaseDataCallService from '@/services/dcHomePageCaseDataCallService';
import bpmProcessDefinitionService from '@/services/bpmProcessDefinitionService';

export default {
  namespace: 'process',

  state: {
    processDefTypeList: {
      list: [],
      pagination: {},
    },
    pieViewList: [],
  },

  effects: {
    *activities({ payload, signal = null }, { call, put }) {
      const response = yield call(dcHomePageCaseDataCallService.countTaskStatus, payload, {
        signal,
      });

      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            activities: resRevert(response),
          },
        });
      }

      return response;
    },
    *queryProcessDefTypeList({ payload, signal = null }, { call, put }) {
      const response = yield call(bpmProcessDefinitionService.getProcessDefType, payload, {
        signal,
      });

      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            processDefTypeList: resRevert(response),
          },
        });
      }
    },
    *updateProcess({ payload }, { call }) {
      const response = yield call(bpmBusinessProcessService.update, payload);

      return response;
    },
  },

  reducers: {
    save(state, action) {
      const pieViewList = [];
      const activities = action?.payload?.activities?.list || [];
      activities.forEach((res) => {
        const ar = {};
        if (res?.variables?.todo) {
          Object.assign(ar, { 'l (0) 0:#0fa5e6 1:#2eebe2': res?.variables?.todo });
        }
        if (res?.variables?.pending) {
          Object.assign(ar, { 'l (0) 0:#eba251 1:#eba453': res?.variables?.pending });
        }
        if (res?.variables?.unassign) {
          Object.assign(ar, { '#5c5251': res?.variables?.unassign });
        }
        pieViewList.push(ar);
      });

      return {
        ...state,
        ...action.payload,
        pieViewList,
      };
    },
  },
};
