import { produce } from 'immer';
import { PolicySource } from 'claim/pages/Enum';

const updateShowSearchModal = (state: any, action: any) => {
  const { showSearchModel } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.showSearchModel = showSearchModel;
    draftState.searchInsuredObj.policyId =
      draftState.searchInsuredObj.policyId || draftState.claimProcessData.insured.policyId;
    if (!showSearchModel) {
      draftState.insuredList = [];
      draftState.searchInsuredObj = {
        policySource: PolicySource.individualVal,
        firstName: '',
        middleName: '',
        surname: '',
        dateOfBirth: '',
        gender: '',
        clientId: '',
      };
    }
  });

  return { ...nextState };
};

export default updateShowSearchModal;
