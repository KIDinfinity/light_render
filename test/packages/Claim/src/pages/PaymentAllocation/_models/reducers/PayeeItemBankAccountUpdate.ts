import lodash from 'lodash';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const PayeeItemContactListUpdate = (state: any, { payload }: any) => {
  const { id, changedFields } = payload || {};

  const nextState = produce(state, (draftState: any) => {
    const idx = lodash.findIndex(
      draftState.claimData.payeeList,
      ({ id: activePayeeId }: any) => activePayeeId === draftState.activePayeeId
    );

    if(isEditStatus)
      draftState.claimData.payeeList[idx].manualAdd = 'Y';

    const payeeBankAccountList = draftState.claimData?.payeeList[idx]?.payeeBankAccountList || [];

    if (!lodash.find(payeeBankAccountList, { id })) {
      draftState.claimData.payeeList[idx].payeeBankAccountList = [
        ...payeeBankAccountList,
        {
          id: uuidv4(),
          manualAdd: 'Y',
          ...changedFields,
        },
      ];
    } else {
      draftState.claimData.payeeList[idx].payeeBankAccountList = lodash.map(
        payeeBankAccountList,
        (item: any) => {
          return item.id === id
            ? {
                ...item,
                ...changedFields,
              }
            : item;
        }
      );
    }
  });

  return { ...nextState };
};

export default PayeeItemContactListUpdate;
