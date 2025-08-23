
export default (state: any, action: any) => {
  const { beneficiaryInfo } = action.payload;
  const payeeId = state.beneficiaryPopUp.fillInPayeeId;
  const currentPayeeIndex = state.claimData.payeeList.findIndex((payee) => payee.id === payeeId);
  if (currentPayeeIndex !== -1) {
    if (beneficiaryInfo) {
      state.claimData.payeeList[currentPayeeIndex] = {
        ...state.claimData.payeeList[currentPayeeIndex],
        ...beneficiaryInfo,
        isNewClient: false,
      };
      const bankAccountList = state.claimData.c360PolicyInfo.clientBankAccountList.filter(
        ({ clientId }) => clientId === beneficiaryInfo.clientId
      );
      state.claimData.payeeList[currentPayeeIndex].payeeBankAccountList = bankAccountList;
    } else {
      state.claimData.payeeList[currentPayeeIndex].isNewClient = true;
    }
  }

  return state;
};
