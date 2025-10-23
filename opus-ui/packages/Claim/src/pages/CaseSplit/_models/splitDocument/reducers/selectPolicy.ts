import { produce } from 'immer';
import { cloneDeep, forEach, chain } from 'lodash';

export default (state: any, { payload: { splitDocumentType, applicationNo, barId } }: any) => {
  return produce(state, (draft: any) => {
    const policy = cloneDeep(draft[splitDocumentType][applicationNo].claimData.policy);
    let documentId: string = '';
    forEach(policy, (el) => {
      if (el.barId === barId) {
        el.isSelected = !el.isSelected;
        documentId = el.bpmDocumentId;
      }
    });
    const isSelect = chain(policy)
      .filter((item: any) => item.bpmDocumentId === documentId)
      .some((el) => el.isSelected)
      .value();
    if (documentId) {
      draft[splitDocumentType][applicationNo].documentData[documentId].isSelected = isSelect;
    }
    draft[splitDocumentType][applicationNo].claimData.policy = policy;
  });
};
