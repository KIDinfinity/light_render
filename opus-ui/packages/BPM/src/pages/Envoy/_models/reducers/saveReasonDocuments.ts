import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    data: any;
    documentObj: any;
  };
}

export default function saveReasonDocuments(state: any, { payload }: IAction) {
  const { data, documentObj } = payload;
  const { groupId, id, reasonDocs } = lodash.pick(data, ['groupId', 'id', 'reasonDocs']);

  const objVal = lodash.values(documentObj)[0];
  const { name, value, enableNumber, enableComment } = lodash.pick(objVal, [
    'name',
    'value',
    'enableNumber',
    'enableComment',
  ]);
  const reasonDocsArr = lodash.map(value, (item: string) => {
    const existDoc = lodash
      .chain(reasonDocs)
      .find({
        docGroupCode: name,
        docTypeCode: item,
      })
      .value();
    if (lodash.isEmpty(existDoc)) {
      return {
        docTypeCode: item,
        docGroupCode: name,
        enableCopies: enableNumber,
        enableComment,
        copies: 1,
        comment: '',
      };
    }
    return existDoc;
  });

  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === id) {
            reason.reasonDocs = [
              ...lodash.filter(reasonDocs, (item: any) => item.docGroupCode !== name),
              ...reasonDocsArr,
            ];
          }
        });
      }
    });
  });
}
