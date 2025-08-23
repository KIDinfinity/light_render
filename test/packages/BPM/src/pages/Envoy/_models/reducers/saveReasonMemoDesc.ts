import lodash from 'lodash';
import { produce } from 'immer';
import { getFieldName } from 'bpm/pages/Envoy/_utils/dataTransferFn';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
    name: string;
    value: string;
  };
}

export default function saveReasonMemoDesc(state: any, { payload }: IAction) {
  const { groupId, dataId, name, value } = payload;
  const path = getFieldName(name);
  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === dataId) {
            lodash.set(reason, path, value);
          }
        });
      }
    });
  });
}
