import type { Reducer } from 'redux';
import type { Effect } from 'dva';
import { serialize as objectToFormData } from 'object-to-formdata';
import { isAssignDocument } from '@/services/claimQcControllerService';
import { handleUDWarnMessage } from 'claim/pages/utils/udMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export interface ModelState {
  claimNo: string;
  processInstanceId: string;
  assignee: string;
  onOkFn: any;
}

export interface ModelType {
  namespace: 'udMessageController';
  state: ModelState;
  effects: {
    initUDMessage: Effect;
    queryUDMessage: Effect;
    receiveUDMessage: Effect;
    openUDMessage: Effect;
  };
  reducers: {
    clearState: Reducer<ModelState>;
    initState: Reducer<ModelState>;
  };
}

const Model: ModelType = {
  namespace: 'udMessageController',

  state: {
    claimNo: undefined,
    processInstanceId: undefined,
    assignee: undefined,
    onOkFn: null,
  },

  effects: {
    *initUDMessage({ payload }, { put }) {
      const { claimNo, processInstanceId, onOkFn, assignee } = payload;
      yield put.resolve({
        type: 'initState',
        payload: {
          claimNo,
          assignee,
          processInstanceId,
          onOkFn,
        },
      });
      yield put({
        type: 'queryUDMessage',
      });
    },
    *queryUDMessage(_, { call, put, select }) {
      const { claimNo, assignee } = yield select((state) => state.udMessageController);
      const userId = yield select((state) => state.user.currentUser?.userId);
      if (assignee === userId) {
        const response = yield call(isAssignDocument, objectToFormData({ claimNo }));
        if (response && response.success && response.resultData) {
          yield put({
            type: 'openUDMessage',
          });
        }
      }
    },
    *receiveUDMessage({ payload }, { put, select }) {
      const { content } = payload;
      const { processInstanceId } = yield select((state) => state.udMessageController);
      if (content && content.indexOf(processInstanceId) > 0) {
        yield put({
          type: 'openUDMessage',
        });
      }
    },
    *openUDMessage(_, { call, select }) {
      const { processInstanceId } = yield select((state) => state.udMessageController);
      const { onOkFn } = yield select((state) => state.udMessageController);
      yield call(
        handleUDWarnMessage,
        formatMessageApi(
          {
            Label_COM_WarningMessage: 'NTF_000015',
          },
          processInstanceId
        ),
        { onOkFn }
      );
    },
  },

  reducers: {
    clearState(state): ModelState {
      return {
        ...state,
        claimNo: undefined,
        processInstanceId: undefined,
        assignee: undefined,
        onOkFn: null,
      };
    },
    initState(state, { payload }): ModelState {
      const { claimNo, processInstanceId, onOkFn, assignee } = payload;

      return {
        ...state,
        claimNo,
        processInstanceId,
        assignee,
        onOkFn,
      };
    },
  },
};

export default Model;
