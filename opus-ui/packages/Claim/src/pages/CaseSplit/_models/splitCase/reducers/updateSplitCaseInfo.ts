import { produce } from 'immer';

export default (state: any, { payload: { changedFields } }: any) => {
  return produce(state, (draft: any) => {
    draft.remark = {
      ...draft.remark,
      ...changedFields,
    };
  });
};
