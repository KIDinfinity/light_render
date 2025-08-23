import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import { connect, useDispatch } from 'dva';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { BankAccountModal } from '../../../_dto/Models';
import BankAccountItem from './BankAccountItem';
import BankCheckAccount from './BankCheckAccount';
import useBankAccountHook from './useBankAccountHook';

import styles from './styles.less';

export interface IProps {
  payeeBankAccountList?: BankAccountModal[];
  taskNotEditable?: boolean;
  payeeId?: string;
  validating?: boolean;
}

export interface IBanckAccount extends FunctionComponent<IProps> {
  BankCheckAccount: any;
}

const BankAccount: IBanckAccount = ({
  payeeBankAccountList,
  taskNotEditable,
  payeeId,
  payeeItem,
}) => {
  const dispatch = useDispatch();

  const addBankAccount = () => {
    dispatch({
      type: 'paymentAllocation/addBankAccount',
      payload: {
        payeeId,
      },
    });
  };

  const { disabledConfig }: any = useBankAccountHook({ payeeItem });

  return (
    <div className={styles.BankAccountList}>
      {lodash
        .chain(payeeBankAccountList)
        .compact()
        .map((bankAccount: BankAccountModal, index: number) => (
          <BankAccountItem
            bankAccountItem={bankAccount}
            payeeBankAccountList={payeeBankAccountList}
            key={`${bankAccount.id}-${index}`}
            index={index}
            manualAdded
            disabledConfig={disabledConfig}
          />
        ))
        .value()}
      {!taskNotEditable && !disabledConfig.button && (
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

export default connect(({ claimEditable, formCommonController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
}))(BankAccount);
