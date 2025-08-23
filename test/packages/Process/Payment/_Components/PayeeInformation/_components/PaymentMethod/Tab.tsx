import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { PaymentMethod } from 'claim/pages/Enum';

import styles from './index.less';

// TODO:初始化不应该渲染
export default ({ item: { id, paymentMethod }, NAMESPACE }: any) => {
  const dispatch = useDispatch();
  const choiceList = [
    {
      key: PaymentMethod.bankCount,
      title: formatMessageApi({
        Label_BIZ_Claim: 'BankAccount',
      }),
    },
    {
      key: PaymentMethod.ByCheckInPayee,
      title: formatMessageApi({
        Label_BIZ_Claim: 'Cheque',
      }),
    },
  ];
  const newPaymentMethod = formUtils.queryValue(paymentMethod);
  return (
    <div className={classnames(styles.selectorContainer, styles.flexRow)}>
      {choiceList.map((el) => (
        <div
          className={classnames(
            styles.selectorText,
            newPaymentMethod !== el.key ? void 0 : styles.blackText
          )}
          onClick={() => {
            if (newPaymentMethod !== el.key) {
              dispatch({
                type: `${NAMESPACE}/paymentPayeeItemUpdate`,
                payload: {
                  changedFields: {
                    paymentMethod: el.key,
                  },
                  id,
                },
              });
            }
          }}
          key={el.key}
        >
          {el.title}
        </div>
      ))}
      <div
        className={classnames(
          styles.selectorMask,
          newPaymentMethod === PaymentMethod.ByCheckInPayee
            ? styles.selectorMaskRight
            : newPaymentMethod !== PaymentMethod.bankCount
            ? styles.hideMask
            : void 0
        )}
      />
    </div>
  );
};
