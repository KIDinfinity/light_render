import { produce }  from 'immer';
import lodash from 'lodash';
import { EToolModules } from '../../_dto/enums';
import { handleDocMandatory } from '../../_functions';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { toolsData, documentList, dropdownConfigure } = draft;
    const { docMandatoryList } = payload;

    const docMandatory = handleDocMandatory(documentList, dropdownConfigure, docMandatoryList);
    const isNotReceived = lodash.some(docMandatory, (doc) => {
      return !doc.isExistMandatory;
    });
    if (isNotReceived) {
      lodash.set(toolsData, `${EToolModules.mandatory}.selected`, true);
    }
    draft.docMandatoryList = docMandatoryList;
  });
};
