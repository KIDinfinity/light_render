import { v5 as uuidv5 } from 'uuid';
import { resRevert } from '@/utils/transform';
import bpmProcessInstanceService from '@/services/bpmProcessInstanceService';

export default {
  namespace: 'processInstance',

  state: {},

  effects: {
    *findProcessStatus({ payload }: any, { call, put }: any) {
      const response = yield call(bpmProcessInstanceService.findProcessStatus, payload);

      yield put({
        type: 'save',
        payload: {
          [`findProcessStatus_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
          findProcessStatus: resRevert(response || {}),
        },
      });

      return response;
    },
    *activateProcessInstance({ payload }: any, { call, put }: any) {
      const response = yield call(bpmProcessInstanceService.activateProcessInstance, payload);

      yield put({
        type: 'save',
        payload: {
          [`activateProcessInstance_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });

      return response;
    },
    *deleteProcessInstance({ payload }: any, { call, put }: any) {
      const response = yield call(bpmProcessInstanceService.deleteProcessInstance, payload);

      yield put({
        type: 'save',
        payload: {
          [`deleteProcessInstance_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });

      return response;
    },
    *getProcessInstance({ payload }: any, { call, put }: any) {
      const response = yield call(bpmProcessInstanceService.getProcessInstance, payload);

      yield put({
        type: 'save',
        payload: {
          [`getProcessInstance_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });

      return response;
    },
    *getProcessInstanceDiagram({ payload }: any, { call, put }: any) {
      const response = yield call(bpmProcessInstanceService.getProcessInstanceDiagram, payload);

      yield put({
        type: 'save',
        payload: {
          [`getProcessInstanceDiagram_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });
      return response;
    },
    *startProcessInstance({ payload }: any, { call, put }: any) {
      const response = yield call(bpmProcessInstanceService.startProcessInstance, payload);

      yield put({
        type: 'save',
        payload: {
          [`startProcessInstance_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });

      return response;
    },
    *suspendProcessInstance({ payload }: any, { call, put }: any) {
      const response = yield call(bpmProcessInstanceService.suspendProcessInstance, payload);

      yield put({
        type: 'save',
        payload: {
          [`suspendProcessInstance_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });
      return response;
    },
  },

  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
