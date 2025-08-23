import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const documentEditOld = draft?.documentEdit || {};
    const { documentEdit } = payload;

    if (lodash.keys(documentEdit).length === 1) {
      if (lodash.has(documentEdit, 'docTypeCode')) {
        const personalDocInd = lodash.find(
          draft.dropdownConfigure,
          (item) =>
            item.indexClass === formUtils.queryValue(documentEditOld?.indexClass) &&
            item.formCategory === formUtils.queryValue(documentEditOld?.formCategory) &&
            item.docTypeCode === formUtils.queryValue(documentEdit.docTypeCode)
        )?.personalDocInd;
        documentEditOld.docTypeCode = formUtils.queryValue(documentEdit.docTypeCode);

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
