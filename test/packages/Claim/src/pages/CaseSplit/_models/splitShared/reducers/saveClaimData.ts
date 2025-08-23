import { produce } from 'immer';
import { cloneDeep } from 'lodash';

export default (state: any, { payload: { claimDatas } }: any) => {
  return produce(state, (draft: any) => {
    draft.claimDatas = cloneDeep(claimDatas);
  });
};
