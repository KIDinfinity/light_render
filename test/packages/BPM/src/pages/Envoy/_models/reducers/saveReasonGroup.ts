/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import { produce } from 'immer';
interface IAction {
  payload: {
    groupIdx: number;
    groupDetail: any;
  };
}
export default (state: any, { payload }: IAction) =>
  produce(state, (draftState: any) => {
    const { groupIdx, groupDetail, id } = lodash.pick(payload, ['groupIdx', 'groupDetail', 'id']);
    if(id) {
      const groupIndex = draftState.currentReasonGroups.findIndex(group => group.id === id);
      draftState.currentReasonGroups[groupIndex] = groupDetail;
    } else {
      draftState.currentReasonGroups[groupIdx] = groupDetail;
      draftState.activedGroupKey = groupIdx;
    }
  });
