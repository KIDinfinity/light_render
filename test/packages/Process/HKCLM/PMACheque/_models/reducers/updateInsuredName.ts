import { produce }  from 'immer';
export default (state: any, action: any) => {
  const { partyInfoItem } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const { firstName, surname } = partyInfoItem;
    draftState.businessData.chequeCase.insured = partyInfoItem;
    draftState.businessData.chequeCase.insured.insuredId = partyInfoItem.clientId;
    draftState.businessData.chequeCase.insuredName = `${firstName} ${surname}`;
  });
  return { ...nextState };
};
