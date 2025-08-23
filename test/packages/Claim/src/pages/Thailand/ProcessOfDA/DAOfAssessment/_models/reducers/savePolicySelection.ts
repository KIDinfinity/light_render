import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveNewPayee = (state: any, action: any) => {
  const { changedFields, fatherId, type } = action.payload;
  const policySelection = formUtils.queryValue(changedFields?.policySelection);
  const nextState = produce(state, (draftState: any) => {
    const claimBankAccounts = lodash
      .chain(
        draftState?.claimEntities?.[
          type === 'policyOwner' ? 'policyOwnerBOListMap' : 'policyPayorBOListMap'
        ]?.[fatherId]?.claimBankAccounts
      )
      .map((item: any) => {
        if (item?.id === policySelection) {
          return {
            ...item,
            select: 1,
            defaultBankAccount: 1,
          };
        }
        return {
          ...item,
          select: 0,
          defaultBankAccount: null,
        };
      })
      .value();
    lodash.set(
      draftState?.claimEntities?.[
        type === 'policyOwner' ? 'policyOwnerBOListMap' : 'policyPayorBOListMap'
      ]?.[fatherId],
      'claimBankAccounts',
      claimBankAccounts
    );
  });
  return { ...nextState };
};

export default saveNewPayee;
