import { produce } from 'immer';
import { cloneDeep, forEach } from 'lodash';

export default (state: any, { payload: { splitDocumentType, applicationNo, documentId } }: any) => {
  return produce(state, (draft: any) => {
    const documentData = draft[splitDocumentType][applicationNo].documentData[documentId];
    const policy = cloneDeep(draft[splitDocumentType][applicationNo].claimData.policy);
    documentData.isSelected = !documentData.isSelected;
    forEach(policy, (el) => {
      if (el.bpmDocumentId === documentId) {
        el.isSelected = documentData.isSelected;
      }
    });
    draft[splitDocumentType][applicationNo].claimData.policy = policy;
  });
};
