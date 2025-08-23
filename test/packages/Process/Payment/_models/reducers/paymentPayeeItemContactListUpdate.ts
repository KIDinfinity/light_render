import lodash from 'lodash';
import { produce } from 'immer';

const PayeeItemContactListUpdate = (state: any, { payload }: any) => {
  const { id, changedFields } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    const idx = lodash.findIndex(
      draftState.paymentModal.datas.payeeList,
      ({ id }: any) => id === draftState.paymentModal.activePayeeId
    );

    if (lodash.keys(changedFields).length === 1)
      draftState.paymentModal.datas.payeeList[idx].manualAdd = 'Y';
    draftState.paymentModal.datas.payeeList[idx].payeeContactList = lodash.map(
      draftState.paymentModal.datas?.payeeList[idx]?.payeeContactList,
      (item: any) => {
        return item.id === id
          ? {
              ...item,
              ...changedFields,
            }
          : item;
      }
    );
  });
  return { ...nextState };
};

export default PayeeItemContactListUpdate;
