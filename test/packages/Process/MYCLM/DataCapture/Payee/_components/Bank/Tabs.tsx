import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { PaymentMethod } from 'claim/pages/Enum';

import { NAMESPACE } from '../../../activity.config';

import styles from './index.less';

export default ({ countryCode, item: { id, paymentMethod } }: any) => {
  const dispatch = useDispatch();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
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
    <div className={classnames(styles.tabWrap, styles.flexRow)}>
      {choiceList.map((el) => (
        <div
          className={classnames(
            taskNotEditable ? styles.notAllowed : styles.item,
            newPaymentMethod !== el.key ? void 0 : styles.default
          )}
          onClick={() => {
            if (newPaymentMethod !== el.key && !taskNotEditable) {
              dispatch({
                type: `${NAMESPACE}/savePayee`,
                payload: {
                  changedFields: {
                    paymentMethod: el.key,
                  },
                  countryCode,
                  payeeId: id,
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
