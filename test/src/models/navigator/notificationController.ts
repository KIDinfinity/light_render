// import { v4 as uuidv4 } from 'uuid';;
import { resRevert } from '@/utils/transform';
import mcNotificationControllerService from '@/services/mcNotificationControllerService';
// import mcGroupControllerService from '@/services/mcGroupControllerService';

export default {
  namespace: 'notificationController',

  state: {
    pageNotificationVisible: true,
    pageNewVisible: false,
    pageSentVisible: false,
    pageDraftVisible: false,
    pageDraftModifyVisible: false,
    pageScheduleModifyVisible: false,
    pageGroupVisible: false,
    pageGroupDetailVisible: false,
    listDraft: [],
    listSent: [],
  },

  effects: {
    *callOffSch({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.callOffSch, payload);

      yield put({
        type: 'save',
        payload: {
          callOffSch: resRevert(response || {}),
        },
      });

      return response;
    },
    *delDraft({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.delDraft, payload);

      yield put({
        type: 'save',
        payload: {
          delDraft: resRevert(response || {}),
        },
      });

      return response;
    },
    *delSch({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.delSch, payload);

      yield put({
        type: 'save',
        payload: {
          delSch: resRevert(response || {}),
        },
      });

      return response;
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.detail, payload);

      yield put({
        type: 'save',
        payload: {
          detail: resRevert(response || {}),
        },
      });

      return response;
    },
    *lsDraft({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.lsDraft, payload);
      const rows = response?.resultData?.rows;

      yield put({
        type: 'saveListDraft',
        payload: {
          listDraft: rows,
        },
      });

      return response;
    },
    *lsSent({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.lsSent, payload);

      yield put({
        type: 'save',
        payload: {
          lsSent: resRevert(response || {}),
        },
      });

      return response;
    },
    *mvNotification({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.mvNotification, payload);

      yield put({
        type: 'save',
        payload: {
          mvNotification: resRevert(response || {}),
        },
      });

      return response;
    },
    *newDraft({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.newDraft, payload);

      yield put({
        type: 'save',
        payload: {
          newDraft: resRevert(response || {}),
        },
      });

      return response;
    },
    *sendImm({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.sendImm, payload);

      yield put({
        type: 'save',
        payload: {
          sendImm: resRevert(response || {}),
        },
      });

      return response;
    },
    *sendSch({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.sendSch, payload);

      yield put({
        type: 'save',
        payload: {
          sendSch: resRevert(response || {}),
        },
      });

      return response;
    },
    *updateDraft({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.updateDraft, payload);

      yield put({
        type: 'save',
        payload: {
          updateDraft: resRevert(response || {}),
        },
      });

      return response;
    },
    *updateSch({ payload }, { call, put }) {
      const response = yield call(mcNotificationControllerService.updateSch, payload);

      yield put({
        type: 'save',
        payload: {
          updateSch: resRevert(response || {}),
        },
      });

      return response;
    },
  },

  reducers: {
    saveListDraft(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    // openNotificationGroupWindow(state) {
    //   return {
    //     ...state,
    //     notificationGroupVisible: true,
    //   };
    // },
    // closeNotificationGroupWindow(state) {
    //   return {
    //     ...state,
    //     notificationGroupVisible: false,
    //   };
    // },
  },
};
