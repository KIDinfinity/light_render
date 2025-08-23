import lodash from 'lodash';
import { produce } from 'immer';

const removeDocumentItem = (state: any, action: any) => {
  const { applicationId, removeCode } = action.payload;

  const nextState = produce(state, (draftState) => {
    const application = draftState.claimEntities.applicationListMap[applicationId];
    application.documentTypeArray = lodash.filter(
      application.documentTypeArray,
      (item) => item !== removeCode
    );
  });

  return { ...nextState };
};

export default removeDocumentItem;
