import { useMemo } from 'react';
import lodash from 'lodash';
import { getFieldDisplayAmount } from '@/utils/accuracy';

export default ({ premiumReceived, totalPremium }: any) => {
  return useMemo(() => {
    return lodash.chain(totalPremium).toString().isEmpty().value()
      ? getFieldDisplayAmount(premiumReceived, 'nb.policyList.premiumReceived')
      : getFieldDisplayAmount(totalPremium, 'nb.policyList.premiumReceived');
  }, [premiumReceived, totalPremium]);
};
