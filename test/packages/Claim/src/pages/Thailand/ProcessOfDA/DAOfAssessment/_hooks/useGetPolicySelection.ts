import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ fatherId, type }: any) => {
  const claimBankAccounts = useSelector(
    (state: any) =>
      state?.daOfClaimAssessmentController?.claimEntities?.[
        type === 'policyOwner' ? 'policyOwnerBOListMap' : 'policyPayorBOListMap'
      ]?.[fatherId]?.claimBankAccounts,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(claimBankAccounts)
      .find((policyOwner: any) => policyOwner.select === 1)
      .get('id')
      .value();
  }, [claimBankAccounts]);
};
