import { produce } from 'immer';

export default (state: any, { payload: { originPolicyLength } }: any) => {
  return produce(state, (draft: any) => {
    draft.originPolicyLength = originPolicyLength;
  });
};
