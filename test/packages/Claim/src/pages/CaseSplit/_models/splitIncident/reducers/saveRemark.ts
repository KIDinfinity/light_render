import { produce } from 'immer';
import { isPlainObject } from 'lodash';

export default (state: any, { payload: { changedFields } }: any) => {
  if (!isPlainObject(changedFields)) return state;
  return produce(state, (draft: any) => {
    draft.caseRemark = { ...draft.caseRemark, ...changedFields };
  });
};
