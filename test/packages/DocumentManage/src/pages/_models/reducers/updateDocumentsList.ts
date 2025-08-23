import { produce }  from 'immer';
import lodash from 'lodash';
import type { DocumentModel } from '../../_dto/model';
import { formUtils } from 'basic/components/Form';

/**
 * 更新document数据
 */
export default (state: any, { payload = {} }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { documentList, businessNoDocumentList, showType } = draft;
    const documents: DocumentModel[] = lodash.get(payload, 'documents', []);
    const allUpdate: string = lodash.get(payload, 'allUpdate', false);

    if (allUpdate) {
      draft.documentList = lodash.map(documentList, (docItem: DocumentModel) => {
        const documentItem = documents.find(
          (item) => formUtils.queryValue(item.docId) === formUtils.queryValue(docItem.docId)
        );
        if (documentItem) {
          return { ...docItem, ...documentItem };
        }
        return docItem;
      });
      draft.businessNoDocumentList = lodash.map(
        businessNoDocumentList,
        (docItem: DocumentModel) => {
          const documentItem = documents.find(
            (item) => formUtils.queryValue(item.docId) === formUtils.queryValue(docItem.docId)
          );
          if (documentItem) {
            return { ...docItem, ...documentItem };
          }
          return docItem;
        }
      );
      return;
    }
    const list = showType === 'caseNo' ? documentList : businessNoDocumentList;
    const changeList = showType === 'caseNo' ? 'documentList' : 'businessNoDocumentList';

    const newList = lodash.map(list, (docItem: DocumentModel) => {
      const documentItem = documents.find(
        (item) => formUtils.queryValue(item.docId) === formUtils.queryValue(docItem.docId)
      );
      if (documentItem) {
        return { ...docItem, ...documentItem };
      }
      return docItem;
    });

    draft[changeList] = newList;
  });
};
