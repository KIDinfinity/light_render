import { produce } from 'immer';

export default (state: any) => {
  const nextState = produce(state, (draft: any) => {
    // eslint-disable-next-line no-param-reassign
    draft.isBind = true;
  });
  return {
    ...nextState,
  };
};
