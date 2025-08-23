import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

const addDocumentItem = (state: any, action: any) => {
  const { applicationId, addCodes = [] } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const application = draftState.claimEntities.applicationListMap[applicationId];
    const documentTypeArray = formUtils.queryValue(application.documentTypeArray) || [];
    application.documentTypeArray = [...documentTypeArray, ...addCodes];
  });

  return { ...nextState };
};

export default addDocumentItem;
