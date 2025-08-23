import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    data: any;
    attachDocsObj: any;
  };
}

export default function saveReasonDocuments(state: any, { payload }: IAction) {
  const { data, attachDocsObj } = payload;
  const { groupId, id } = lodash.pick(data, ['groupId', 'id']);

  const objVal = lodash.values(attachDocsObj)[0];
  const { value } = lodash.pick(objVal, ['value']);

  const { attachDocArr } = state;
  const attachDocs = lodash.map(value, (item: string) =>
    (lodash.chain(attachDocArr).pickBy(lodash.isObject) as any)
      .find({ externalDocId: item })
      .value()
  );
  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === id) {
            reason.attachDocs = attachDocs;
          }
        });
      }
    });
  });
}
