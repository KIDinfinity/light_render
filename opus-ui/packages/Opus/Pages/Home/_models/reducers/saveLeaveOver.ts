import { produce } from 'immer';

import { ModalTabs } from 'opus/Enums';

export default (state: any, action: any) => {
  const { leaveOver, type }: any = action.payload;
  const map = {
    [ModalTabs.myTask]: 'taskLeaveOver',
    [ModalTabs.myTeamTask]: 'leaveOver',
  };
  const nextState = produce(state, (draftState: any) => {
    const targetKey: any = [map[type]];
    if (!targetKey) return;
    draftState[targetKey] = leaveOver;
  });
  return { ...nextState };
};
