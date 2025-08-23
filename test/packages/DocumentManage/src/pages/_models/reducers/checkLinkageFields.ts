import { produce }  from 'immer';
import lodash from 'lodash';
import type { DocumentModel } from '../../_dto/model';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { documentList } = draft;
    const { documentInfo, documentItem } = payload;

    draft.documentList = lodash.map(documentList, (docItem: DocumentModel) => {
      if (formUtils.queryValue(documentItem.docId) === formUtils.queryValue(docItem.docId)) {
        return { ...docItem, ...documentInfo };
      }
      return docItem;
    });
  });
};
