import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draft: any) => {
    const { payload } = action;
    // eslint-disable-next-line no-param-reassign
    draft.homeHotKeyIsBind = payload.homeHotKeyIsBind;
  });
  return {
    ...nextState,
  };
};
