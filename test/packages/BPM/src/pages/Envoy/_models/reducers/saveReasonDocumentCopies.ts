import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    data: any;
    copiesObj: {
      name: string;
      selected: string;
      number: number;
    };
  };
}

export default function saveReasonDocumentCopies(state: any, { payload }: IAction) {
  const { data, copiesObj } = payload;
  const { groupId, id } = lodash.pick(data, ['groupId', 'id']);

  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === id) {
            reason.reasonDocs = lodash.map(reason.reasonDocs, (reasonDoc: any) => {
              if (
                reasonDoc.docGroupCode === copiesObj.name &&
                reasonDoc.docTypeCode === copiesObj.selected
              ) {
                return {
                  ...reasonDoc,
                  copies: copiesObj.number >= 1 ? copiesObj.number : 1,
                };
              }
              return reasonDoc;
            });
          }
        });
      }
    });
  });
}
