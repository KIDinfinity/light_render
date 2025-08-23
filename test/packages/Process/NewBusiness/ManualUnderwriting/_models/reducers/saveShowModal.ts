import { produce } from 'immer';
export default (state: any, action: any) => {
  const { type } = action.payload;
  const showModalType = type || state.showModalType;
  const nextState = produce(state, (draftState: any) => {
    switch (showModalType) {
      case 'plan':
        draftState.modalData.processData = {
          planInfoData: draftState.processData?.planInfoData,
        };
        break;
      case 'payment':
        draftState.modalData.processData = {
          planInfoData: draftState.processData?.planInfoData,
          chequeInfoList: draftState.processData?.chequeInfoList,
          paymentList: draftState.processData.paymentList,
        };
        break;
      case 'charityOrganization':
        draftState.modalData.processData = {
          charityOrganizationList: draftState.processData?.charityOrganizationList || [],
        };
        break;
      case 'decision':
        draftState.modalData.processData = {
          coverageList: draftState.processData.coverageList,
        };
        break;
      case 'client':
        draftState.modalData.entities = draftState.entities;
        draftState.modalData.processData = {
          clientInfoList: draftState.processData.clientInfoList,
        };
        break;
      default:
        break;
    }
    draftState.showModalType = showModalType;
  });
  return {
    ...nextState,
  };
};
