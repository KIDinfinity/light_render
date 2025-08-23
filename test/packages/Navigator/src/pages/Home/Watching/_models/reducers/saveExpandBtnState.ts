/**
 * 保存展开按钮的状态
 */
import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    payload: { expandTabHidden },
  } = action;

  const nextState = produce(state, (draftState: any) => {
    draftState.expandTabHidden = Boolean(expandTabHidden);
  });

  return { ...nextState };
};
