import { produce } from 'immer';

export default (state: any, { payload: { changedFields } }: any) => {
  return produce(state, (draft: any) => {
    Object.keys(changedFields).forEach((changedFieldName) => {
      draft.caseRemark[changedFieldName] = changedFields[changedFieldName];
    });
  });
};
