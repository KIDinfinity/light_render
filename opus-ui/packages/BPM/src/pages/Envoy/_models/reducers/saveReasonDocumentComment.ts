import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    data: any;
    commentObj: {
      name: string;
      selected: string;
      comment: string;
    };
  };
}

export default function saveReasonDocumentComment(state: any, { payload }: IAction) {
  const { data, commentObj } = payload;
  const { groupId, id } = lodash.pick(data, ['groupId', 'id']);

  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === id) {
            reason.reasonDocs = lodash.map(reason.reasonDocs, (reasonDoc: any) => {
              if (
                reasonDoc.docGroupCode === commentObj.name &&
                reasonDoc.docTypeCode === commentObj.selected
              ) {
                return {
                  ...reasonDoc,
                  comment: commentObj.comment,
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
