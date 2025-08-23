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

export default function saveReasonMemoRemark(state: any, { payload }: IAction) {
  const { groupId, dataId, name, value } = payload;
  const regRemark = /subRemark$/;
  const path = getFieldName(name);
  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === dataId) {
            if (regRemark.test(path)) {
              const pendingMemoRemarkPath = path.slice(0, path.indexOf('.')) + '.memoRemark';
              lodash.set(reason, pendingMemoRemarkPath, value);
            }
            lodash.set(reason, path, value);
          }
        });
      }
    });
  });
}
