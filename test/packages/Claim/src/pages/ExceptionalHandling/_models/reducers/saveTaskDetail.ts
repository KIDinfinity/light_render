import { produce } from 'immer';

const saveTaskDetail = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.taskDetail = { ...action.payload };
  });
  return { ...nextState };
};

export default saveTaskDetail;
