import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { groupIdx, pendingMemoList } = lodash.pick(payload, ['groupIdx', 'pendingMemoList']);

  return produce(state, (draftState: any) => {
    lodash.set(
      draftState.currentReasonGroups[groupIdx],
      'reasonDetails[0].pendingMemoList',
      pendingMemoList
    );
    draftState.activedGroupKey = groupIdx;
  });
};
