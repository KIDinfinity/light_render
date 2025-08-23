import React from 'react';
import { PaymentMethod } from 'claim/pages/Enum';

import Tabs from './Tabs';

import Cheque from './Cheque';
import BankList from './BankList';

import styles from './index.less';

const Bank = ({ item, countryCode }: any) => {
  const { id, payeeBankAccountList = [], paymentMethod } = item;

  return (
    <div className={styles.bankWrap}>
      <Tabs countryCode={countryCode} item={item} />

      {paymentMethod === PaymentMethod.bankCount ? (
        <BankList id={id} list={payeeBankAccountList} />
      ) : (
        <div className={styles.chequeWrap}>
          <Cheque item={item} />
        </div>
      )}
    </div>
  );
};

export default Bank;
