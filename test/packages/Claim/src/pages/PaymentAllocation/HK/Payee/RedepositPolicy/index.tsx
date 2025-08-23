import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import React, { useMemo } from 'react';
import type { PayeeModal } from '../../../_dto/Models';
import DepositItem from './DepositItem';
import DepositPlusItem from './DepositPlusItem';
import DepositTableHeader from './DepositTableHeader';

type RedepositPolicyProps = {
  payeeItem: PayeeModal;
};

export default function RedepositPolicy({ payeeItem }: RedepositPolicyProps) {
  const canRedeposit = useMemo(() => {
    return (
      formUtils.queryValue(payeeItem.paymentMethod) === 'CHQM' &&
      formUtils.queryValue(payeeItem.subPaymentMethod) === 'RTPX'
    );
  }, [payeeItem.paymentMethod, payeeItem.subPaymentMethod]);

  return (
    <div>
      <DepositTableHeader />
      {lodash
        .chain(payeeItem?.claimRedepositList)
        .compact()
        .sortBy('viewOrder')
        .map((redepositPolicyItem) => (
          <DepositItem
            canRedeposit={canRedeposit}
            key={`${redepositPolicyItem.id}-${payeeItem?.id}`}
            redepositPolicyItem={redepositPolicyItem}
            payeeItem={payeeItem}
          />
        ))
        .value()}
      {canRedeposit && <DepositPlusItem payeeItem={payeeItem} />}
    </div>
  );
}
