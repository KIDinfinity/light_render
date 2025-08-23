import { v4 as uuidv4 } from 'uuid';
import claimMajorClaimControllerService from '@/services/claimMajorClaimControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';

export default {
  namespace: 'mjProcessController',
  state: {
    claimProcessData: {
      submissionChannel: 'H',
      submissionDate: '2019-10-21T16:00:00.000+0000',
      id: uuidv4(),
      caseCategory: 'TH_MC_CTG01',
      variables: {},
      caseSource: 'C',
    },
    claimHistory: null,
  },
  effects: {
    *create(_, { call, select }) {
      const claimProcessData = yield select((state) => state.mjProcessController.claimProcessData);
      const response = yield call(claimMajorClaimControllerService.create, claimProcessData);
      return response;
    },
    *getHistory({ payload }, { call, put }) {
      const requestParam = objectToFormData(payload);
      const response = yield call(claimMajorClaimControllerService.get, requestParam);
      if (response.success && response.resultData) {
        const claimHistory = response.resultData;
        // 保存理赔数据
        yield put({
          type: 'save',
          payload: claimHistory,
        });
      }
      return response;
    },
    *getDataForSubmit(_, { select }) {
      const { claimHistory, taskDetail } = yield select((state) => ({
        claimHistory: state.mjProcessController.claimHistory,
        taskDetail: state.processTask.getTask,
      }));
      const dataForSubmit = {
        ...claimHistory,
        ...lodash.pick(taskDetail, ['taskId', 'processInstanceId']),
      };
      return dataForSubmit;
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        claimHistory: {
          ...payload,
        },
      };
    },
    clear(state) {
      return {
        ...state,
        claimHistory: null,
      };
    },
  },
};
