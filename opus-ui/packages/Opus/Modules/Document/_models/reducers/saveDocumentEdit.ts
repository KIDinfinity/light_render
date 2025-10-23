import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    let documentEditOld = draft?.documentEdit || {};
    const { documentEdit } = payload;

    if (lodash.keys(documentEdit).length === 1) {
      if (lodash.has(documentEdit, 'documentFileId')) {
        const targetConfigure = lodash.find(
          draft.dropdownConfigure,
          (item) => item.id === formUtils.queryValue(documentEdit.documentFileId)
          // item.indexClass === formUtils.queryValue(documentEditOld?.indexClass) &&
          // item.formCategory === formUtils.queryValue(documentEditOld?.formCategory) &&
          // item.docTypeCode === formUtils.queryValue(documentEdit.docTypeCode)
        );
        const {
          personalDocInd,
          docTypeCode,
          formCategory,
          externalDocTypeCode,
          indexClass,
        } = lodash.pick(targetConfigure, [
          'personalDocInd',
          'docTypeCode',
          'formCategory',
          'externalDocTypeCode',
          'indexClass',
        ]);
        documentEditOld = {
          ...documentEditOld,
          docTypeCode,
          formCategory,
          externalDocTypeCode,
          indexClass,
        };

        if (personalDocInd === 'N') {
          documentEditOld.clientId = documentEditOld?.identityNo;
        } else {
          documentEditOld.clientId = '';
        }
      }
      if (lodash.has(documentEdit, 'indexClass')) {
        documentEditOld.formCategory = '';
        documentEditOld.docTypeCode = '';
      }

      if (lodash.has(documentEdit, 'formCategory')) {
        documentEditOld.docTypeCode = '';
      }
    }

    draft.documentEdit = { ...documentEditOld, ...documentEdit };
  });
};
