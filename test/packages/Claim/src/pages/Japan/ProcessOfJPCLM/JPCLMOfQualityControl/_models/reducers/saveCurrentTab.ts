import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const currentTab = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.currentTab = currentTab;
    const currentDocumentId = lodash.get(
      draftState.applicationList.find(
        (application: any) => application.applicationNo === currentTab
      ),
      `documentList[0]`,
      ''
    );
    const currentDocument = lodash.get(
      draftState,
      `claimProcessData.claimEntities.bpoFormDataList.${currentDocumentId}`,
      {}
    );
    if(!lodash.isEqual(draftState.currentDocument, currentDocument))
      draftState.currentDocument = currentDocument;
  });
  return { ...nextState };
};
