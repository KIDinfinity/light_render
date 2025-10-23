/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import { produce } from 'immer';
interface IAction {
  payload: {
    groupDetail: any;
    id: string;
  };
}
export default (state: any, { payload }: IAction) =>
  produce(state, (draftState: any) => {
    const { groupDetail, id } = lodash.pick(payload, ['groupIdx', 'groupDetail', 'id']);
    if (id) {
      const groupIndex = draftState.currentReasonGroups.findIndex((group) => group.id === id);
      draftState.currentReasonGroups[groupIndex] = groupDetail;
    }
  });
