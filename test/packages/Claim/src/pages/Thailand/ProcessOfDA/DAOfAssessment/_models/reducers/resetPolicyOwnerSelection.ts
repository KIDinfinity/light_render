import { produce } from 'immer';
import lodash from 'lodash';

const saveNewOwner = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(draftState?.claimEntities.policyOwnerBOListMap, (policyOwnerItem: any) => {
      const { id: fatherId } = policyOwnerItem;
      const claimBankAccounts = lodash
        .chain(draftState?.claimEntities.policyOwnerBOListMap[fatherId]?.claimBankAccounts)
        .map((item: any) => {
          return {
            ...item,
            select: 0,
            defaultBankAccount: null,
          };
        })
        .value();
      lodash.set(
        draftState?.claimEntities.policyOwnerBOListMap[fatherId],
        'claimBankAccounts',
        claimBankAccounts
      );
    });
  });

  return { ...nextState };
};

export default saveNewOwner;
