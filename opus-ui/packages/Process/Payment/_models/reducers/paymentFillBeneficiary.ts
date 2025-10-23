export default (state: any, action: any) => {
  const { beneficiaryInfo } = action.payload;
  const payeeId = state.beneficiaryPopUp.fillInPayeeId;
  const currentPayeeIndex = state.paymentModal.datas.payeeList.findIndex(
    (payee) => payee.id === payeeId
  );
  if (currentPayeeIndex !== -1) {
    if (beneficiaryInfo) {
      state.paymentModal.datas.payeeList[currentPayeeIndex] = {
        ...state.paymentModal.datas.payeeList[currentPayeeIndex],
        ...beneficiaryInfo,
        isNewClient: false,
      };
      const bankAccountList = state.paymentModal.datas.c360PolicyInfo.clientBankAccountList.filter(
        ({ clientId }) => clientId === beneficiaryInfo.clientId
      );
      state.paymentModal.datas.payeeList[currentPayeeIndex].payeeBankAccountList = bankAccountList;
    } else {
      state.paymentModal.datas.payeeList[currentPayeeIndex].isNewClient = true;
    }
  }

  return state;
};
