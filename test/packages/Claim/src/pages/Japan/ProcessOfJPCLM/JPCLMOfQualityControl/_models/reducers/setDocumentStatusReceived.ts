import { produce } from 'immer';
import { DocumentStatus } from '../../Enum';

export default (state: any, action: any) => {
  return produce(state, (draft: any) => {
    const { documentId } = action.payload;
    draft.claimProcessData.claimEntities.bpoFormDataList[documentId] = {
      ...draft.claimProcessData.claimEntities.bpoFormDataList[documentId],
      formData: {
        ...draft.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
        documentStatus: DocumentStatus.R,
      },
      isChangeStausByUser: true,
    };
  });
};
