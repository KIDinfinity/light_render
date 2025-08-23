import { produce } from 'immer';

const removePageList = (state: any, action: any) => {
  const { id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.pageList = draftState.pageList.filter((el: any) => el.id !== id);
  });
  return nextState;
};


export default removePageList
