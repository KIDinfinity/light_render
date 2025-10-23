import { produce } from 'immer';

export default (state: any, { payload }) => {
  const { categoryReasons } = payload;
  return produce(state, (draftState: any) => {
    draftState.categoryReasons = categoryReasons;
  });
};
