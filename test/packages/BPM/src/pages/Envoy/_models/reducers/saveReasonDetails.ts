import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    groupId: string;
    id: string;
    changeData: any;
  };
}

export default function saveReasonDetails(state: any, { payload }: IAction) {
  const { groupId, id, changeData } = payload;
  return produce(state, (draftState: any) => {
    draftState.currentReasonGroups = lodash.map(
      draftState.currentReasonGroups,
      (groupData: any) => {
        return groupData.id === groupId
          ? {
              ...groupData,
              reasonDetails: lodash.map(groupData.reasonDetails, (detailItem: any) => {
                return detailItem.id === id
                  ? {
                      ...detailItem,
                      ...changeData,
                    }
                  : detailItem;
              }),
            }
          : groupData;
      }
    );
  });
}
