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
    const documents: DocumentModel = lodash.get(payload, 'documents', {});
    const allUpdate: string = lodash.get(payload, 'allUpdate', false);

    const List = showType === 'caseNo' ? documentList : businessNoDocumentList;
    const changeList = showType === 'caseNo' ? 'documentList' : 'businessNoDocumentList';

    if (allUpdate) {
      if (lodash.isArray(documents)) {
        draft.documentList = [...documents, ...documentList];
        draft.businessNoDocumentList = [...documents, ...businessNoDocumentList];
      }
      if (lodash.isPlainObject(documents)) {
        draft.documentList = [
          ...lodash.map(documentList, (docItem: DocumentModel) => {
            if (formUtils.queryValue(documents.docId) === formUtils.queryValue(docItem.docId)) {
              return { ...docItem, ...documents };
            }
            return docItem;
          }),
        ];
        draft.businessNoDocumentList = [
          ...lodash.map(businessNoDocumentList, (docItem: DocumentModel) => {
            if (formUtils.queryValue(documents.docId) === formUtils.queryValue(docItem.docId)) {
              return { ...docItem, ...documents };
            }
            return docItem;
          }),
        ];
      }
      return;
    }

    if (lodash.isArray(documents)) {
      draft[changeList] = [...documents, ...List];
    }
    if (lodash.isPlainObject(documents)) {
      draft[changeList] = [
        ...lodash.map(List, (docItem: DocumentModel) => {
          if (formUtils.queryValue(documents.docId) === formUtils.queryValue(docItem.docId)) {
            return { ...docItem, ...documents };
          }
          return docItem;
        }),
      ];
    }
  });
};
