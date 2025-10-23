import { produce } from 'immer';

const savePageList = (state: any, action: any) => {
  const { pageList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.pageList = pageList;
  });
  return nextState;
};


export default savePageList
