import { v5 as uuidv5 } from 'uuid';
// import { plainToClassFromExist } from 'class-transformer';
// import { validateSync } from 'class-validator';
import { serialize as objectToFormData } from 'object-to-formdata';
import { resRevert } from '@/utils/transform';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import dcHomePageCaseDataCallService from '@/services/dcHomePageCaseDataCallService';
import slaStatsControllerService from '@/services/slaStatsControllerService';
import { formUtils } from 'basic/components/Form';

import { produce } from 'immer';
import lodash from 'lodash';
// TODO 匹配对应的请求和响应dto
// import { RulePaginationList, Rule } from '@/../dto/rule.ts';

export default {
  namespace: 'processTask',

  state: {
    getTask: {},
    medicalRequestModalDisplay: false,
    subTaskId: '',
    stopAutoSave: false,
  },

  effects: {
    *assignTask({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.assignTask, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`assignTask_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *completeTask({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.completeTask, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`completeTask_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *countTaskByActivity({ payload }, { call, put }) {
      const response = yield call(dcHomePageCaseDataCallService.countTaskByActivity, payload);
      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`countTaskByActivity_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *deleteTask({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.deleteTask, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`deleteTask_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *getTask({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.getTask, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      if (response?.success && response?.resultData) {
        const slaResponse = yield call(
          slaStatsControllerService.remain,
          objectToFormData({
            caseId: response?.resultData?.processInstanceId,
            activityKey: response?.resultData?.taskDefKey,
          })
        );

        const slaResponseData = slaResponse?.resultData;

        yield put({
          type: 'save',
          payload: {
            getTask: { ...response?.resultData, remainTime: slaResponseData },
          },
        });
      }

      return response;
    },
    *listTasks({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.listTasks, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`listTasks_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *Tasks({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.Tasks, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`Tasks_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *validateBusiness({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.validateBusiness, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`validateBusiness_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *validateTask({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.validateTask, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`validateTask_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *getButtonList({ payload }, { call, put }) {
      const response = yield call(bpmProcessTaskService.getButtonList, payload);

      yield put({
        type: 'save',
        payload: {
          getButtonList: response?.resultData,
        },
      });

      return response;
    },

    *getTaskByBusinessNo({ payload }, { call }) {
      const { claimNo } = payload;
      return yield call(bpmProcessTaskService.getTaskByBusinessNo, `${claimNo}`);
    },
    *getLastTask({ payload }: any, { call }: any) {
      const { claimNo, caseCategory } = payload;

      if (claimNo && caseCategory) {
        const response = yield call(
          bpmProcessTaskService.getLastTask,
          objectToFormData({ claimNo, caseCategory })
        );

        if (response && response.success) {
          return response.resultData;
        }

        return null;
      }
    },
    *changeTask({ payload }, { put, select }) {
      const getTask = yield select((state) => state.processTask.getTask);
      const changedFields = formUtils.cleanValidateData(payload?.changedFields);
      yield put({
        type: 'save',
        payload: {
          getTask: {
            ...getTask,
            ...changedFields,
          },
        },
      });
    },
    *getTaskDetail(_: any, { select }: any): Generator<any, void, any> {
      const getTask = yield select((state: any) => state.processTask.getTask);
      return getTask;
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeTaskState(state) {
      return {
        ...state,
        getTask: {},
      };
    },
    toogleMedicalRequestModal(state: any, action: any) {
      const medicalRequestModalDisplay = lodash.get(action, 'payload.medicalRequestModalDisplay');
      const nextState = produce(state, (draftState: any) => {
        draftState.medicalRequestModalDisplay = medicalRequestModalDisplay;
      });
      return { ...nextState };
    },
    setSubTaskId(state: any, action: any) {
      const subTaskId = lodash.get(action, 'payload.subTaskId', '');
      const nextState = produce(state, (draftState: any) => {
        draftState.subTaskId = subTaskId;
      });

      return { ...nextState };
    },
  },
};
