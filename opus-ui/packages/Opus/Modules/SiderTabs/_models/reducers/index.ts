import { produce } from 'immer';

export default {
  saveOpenSider: (state: any, action: any) => {
    const nextState = produce(state, (draftState: any) => {
      draftState.openSider = action.payload.openSider;
    });
    return { ...nextState };
  },
  saveActiveKey: (state: any, action: any) => {
    const nextState = produce(state, (draftState: any) => {
      draftState.activeKey = action.payload.activeKey;
    });
    return { ...nextState };
  },
};
