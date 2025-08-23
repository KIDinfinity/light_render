import { SS, SSKey } from '@/utils/cache';
import homeModeBtnService from '@/machines/homeModeBtn';

export default {
  namespace: 'homeModeBtn',

  state: {
    mode: 'flow',
    btnExpand: false,
  },

  effects: {
    *toggleModeBtn(_: any, { put }: any) {
      const machineState = homeModeBtnService.send('TOGGLE');
      const { btnExpand }: any = machineState.value;

      yield put({
        type: 'saveToggleModeBtn',
        payload: {
          btnExpand,
        },
      });
    },
    *initMode(_: any, { select, put, take }: any) {
      let userId = yield select((state: any) => state.user.currentUser.userId);
      if (!userId) {
        yield take('user/fetchCurrent/@@end');
      }
      userId = yield select((state: any) => state.user.currentUser.userId);

      const defaultMode = SS.getItem(SSKey.USER_ID, false) || (userId === 'Alex' ? 'card' : 'flow');

      homeModeBtnService.send(defaultMode.toUpperCase());

      yield put({
        type: 'saveInitMode',
        payload: {
          mode: defaultMode,
        },
      });
    },
    *toggleMode({ payload }: any, { put }: any) {
      const machineState = homeModeBtnService.send(payload.mode.toUpperCase());

      const { mode, btnExpand }: any = machineState.value;

      yield put({
        type: 'saveToggleMode',
        payload: {
          mode,
          btnExpand,
        },
      });

      SS.setItem(SSKey.USER_ID, mode);
    },
  },

  reducers: {
    saveToggleModeBtn(state: any, action: any) {
      const {
        payload: { btnExpand },
      } = action;

      return {
        ...state,
        btnExpand: btnExpand === 'active',
      };
    },
    saveInitMode(state: any, action: any) {
      const {
        payload: { mode },
      } = action;

      return {
        ...state,
        mode,
      };
    },
    saveToggleMode(state: any, action: any) {
      const {
        payload: { mode, btnExpand },
      } = action;

      return {
        ...state,
        mode,
        btnExpand: btnExpand === 'active',
      };
    },
  },

  subscriptions: {
    setup({ dispatch }: any) {
      dispatch({
        type: 'initMode',
      });
    },
  },
};
