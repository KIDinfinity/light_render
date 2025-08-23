import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import { connect, useDispatch } from 'dva';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { BankAccountModal } from '../../../_dto/Models';
import { EPaymentMethod } from '../../../_dto/Enums';
import BankAccountItem from './BankAccountItem';
import BankCheckAccount from './BankCheckAccount';

import styles from './styles.less';

export interface IProps {
  payeeBankAccountList?: BankAccountModal[];
  taskNotEditable?: boolean;
  payeeId?: string;
  paymentMethod?: string;
}

export interface IBanckAccount extends FunctionComponent<IProps> {
  BankCheckAccount: any;
}

const BankAccount: IBanckAccount = ({
  payeeBankAccountList,
  taskNotEditable,
  payeeId,
  paymentMethod,
}) => {
  const dispatch = useDispatch();
  const isPrem = paymentMethod === EPaymentMethod.PremiumAccount;
  const addBankAccount = () => {
    dispatch({
      type: 'paymentAllocation/addBankAccount',
      payload: {
        payeeId,
      },
    });
  };

  return (
    <div className={styles.BankAccountList}>
      {lodash
        .chain(payeeBankAccountList)
        .map((bankAccount: BankAccountModal, index: number) => (
          <BankAccountItem
            bankAccountItem={bankAccount}
            payeeBankAccountList={payeeBankAccountList}
            key={`${bankAccount.id}-${index}`}
          />
        ))
        .value()}
      {!taskNotEditable && !isPrem && (
        <ButtonOfClaim
          handleClick={addBankAccount}
          buttonText={formatMessageApi({
            Label_BPM_Button: 'AddBankAccount',
          })}
        />
      )}
    </div>
  );
};

BankAccount.BankCheckAccount = BankCheckAccount;

export default connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))(BankAccount);
