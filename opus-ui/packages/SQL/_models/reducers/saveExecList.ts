import { produce } from 'immer';

const saveExecList = (state: any, action: any) => {
  const { execList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.execList = execList;
  });
  return nextState;
};


export default saveExecList
