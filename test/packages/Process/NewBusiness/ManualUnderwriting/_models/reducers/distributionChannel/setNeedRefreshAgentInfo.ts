import { produce } from 'immer';

interface IAction {
  type: any;
  payload: {
    needRefreshAgentInfo: string;
  };
}

export default (state: any, action: IAction) => {
  const { needRefreshAgentInfo } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.needRefreshAgentInfo = needRefreshAgentInfo;
  });
  return { ...nextState };
};
