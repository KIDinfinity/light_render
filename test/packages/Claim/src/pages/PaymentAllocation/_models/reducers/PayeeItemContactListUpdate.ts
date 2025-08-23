import lodash from 'lodash';
import { produce } from 'immer';

const PayeeItemContactListUpdate = (state: any, { payload }: any) => {
  const { id, changedFields } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    const idx = lodash.findIndex(
      draftState.claimData.payeeList,
      ({ id }: any) => id === draftState.activePayeeId
    );

    if(lodash.keys(changedFields).length === 1)
      draftState.claimData.payeeList[idx].manualAdd = 'Y'
    draftState.claimData.payeeList[idx].payeeContactList = lodash.map(
      draftState.claimData?.payeeList[idx]?.payeeContactList,
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
