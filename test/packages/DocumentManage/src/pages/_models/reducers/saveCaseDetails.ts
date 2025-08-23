import { produce }  from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { caseInfo } = payload;
    draft.caseInfo = caseInfo;
  });
};
