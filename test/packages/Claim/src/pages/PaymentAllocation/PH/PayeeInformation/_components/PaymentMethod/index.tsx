import React from 'react';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PaymentMethod } from 'claim/pages/Enum';
import { formUtils } from 'basic/components/Form';
import Tab from './Tab';
import Cheque from './Cheque';
import BankList from './BankList';

import styles from './index.less';

// TODO:初始化不应该渲染
export default ({ list, item }: any) => {
  return (
    <div className={styles.paymentMethodWrap}>
      <div className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Policy: 'PaymentMethod',
        })}
      </div>
      <div className={styles.item}>
        <Tab item={item} />
        {formUtils.queryValue(item.paymentMethod) === PaymentMethod.bankCount ? (
          <BankList list={list}/>
        ) : (
          <Cheque item={item} />
        )}
      </div>
    </div>
  );
};
