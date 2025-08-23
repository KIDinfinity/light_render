import { produce } from 'immer';
import lodash from 'lodash';

const saveNewPayor = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(draftState?.claimEntities.policyPayorBOListMap, (policyPayorItem: any) => {
      const { id: fatherId } = policyPayorItem;
      const claimBankAccounts = lodash
        .chain(draftState?.claimEntities.policyPayorBOListMap[fatherId]?.claimBankAccounts)
        .map((item: any) => {
          return {
            ...item,
            select: 0,
            defaultBankAccount: null,
          };
        })
        .value();
      lodash.set(
        draftState?.claimEntities.policyPayorBOListMap[fatherId],
        'claimBankAccounts',
        claimBankAccounts
      );
    });
  });

  return { ...nextState };
};

export default saveNewPayor;
