import { produce } from 'immer';

export default (state: any, { payload: { isNewClaimNo } }: any) => {
  return produce(state, (draft: any) => {
    draft.isNewClaimNo = isNewClaimNo;
  });
};
