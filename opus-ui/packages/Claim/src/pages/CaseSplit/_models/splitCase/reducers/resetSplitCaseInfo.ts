import { produce } from 'immer';

export default (state: any, { payload: { originalCaseNo } }: any) => {
  return produce(state, (draft: any) => {
    draft.remark.originalRemark = 'Split Case';
    draft.remark.newRemark = `Split from case ${originalCaseNo}`;
    draft.remark.businessNo = '';
  });
};
