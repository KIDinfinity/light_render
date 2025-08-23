import { produce } from 'immer';

const saveCurrentMenu = (state: any, action: any) => {
  const { currentMenu } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.currentMenu = currentMenu;
  });
  return nextState;
};


export default saveCurrentMenu
