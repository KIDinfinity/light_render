import { produce } from 'immer';

import { ModalTabs } from 'opus/Enums';

export default (state: any, action: any) => {
  const { durationType, type } = action.payload;
  const map = {
    [ModalTabs.myTask]: 'taskDurationType',
    [ModalTabs.myTeamTask]: 'durationType',
  };
  const nextState = produce(state, (draftState: any) => {
    const durationTypeKey = [map[type]];
    if (!durationTypeKey) return;
    draftState[map[type]] = durationType;
  });
  return { ...nextState };
};
