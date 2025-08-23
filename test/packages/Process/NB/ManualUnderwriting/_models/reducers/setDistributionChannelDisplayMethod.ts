import { produce } from 'immer';

interface IAction {
  type: any;
  payload: {
    displayMethod: string;
  };
}

export default (state: any, action: IAction) => {
  const { displayMethod } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.distributionChannelDisplayMethod = displayMethod;
  });
  return { ...nextState };
};
