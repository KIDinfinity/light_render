/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

enum PrintDestinationSelected {
  MS = 'manualStatement',
  RDA = 'returnToAgent',
  RDC = 'returnToClient',
}

const updatePayeePaymentMethod = (state: any, { payload }: any) => {
  const { payeeIndex, printDestinationSelected } = payload;
  const printDestinationSelectedDicts = state?.printDestinationSelectedDicts;
  const nextState = produce(state, (draftState: any) => {
    const payeeItem = draftState.paymentModal.datas.payeeList[payeeIndex] || {};
    const printDestination = (() => {
      const printDestinationMap = new Map();
      lodash.forEach(printDestinationSelectedDicts, (s) => {
        printDestinationMap.set(
          PrintDestinationSelected[s.dictCode],
          lodash.includes(printDestinationSelected, s.dictCode) ? 'Y' : 'N'
        );
      });
      return Object.fromEntries(printDestinationMap);
    })();
    draftState.paymentModal.datas.payeeList[payeeIndex] = {
      ...payeeItem,
      ...printDestination,
    };
  });

  return { ...nextState };
};

export default updatePayeePaymentMethod;
