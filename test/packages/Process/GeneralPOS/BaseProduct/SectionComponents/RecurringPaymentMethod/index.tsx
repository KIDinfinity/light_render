import { useDispatch, useSelector } from 'dva';
import React, { useEffect } from 'react';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import Item from './Item';
import PayInOptionSection from './PayInOptionSection';

const RecurringPaymentMethod = ({ transactionId }) => {
  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.transactionTypeCode
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/recurringPaymentMethodInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId]);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getAllBank`,
      payload: { transactionTypeCode },
    });
  }, [transactionTypeCode]);
  return (
    <div className={styles.recurringPaymentMethod}>
      <div className={styles.payInOption}>
        <PayInOptionSection transactionId={transactionId} />
      </div>
      <div className={styles.recurringPaymentMethodFields}>
        <Item transactionId={transactionId} />
      </div>
    </div>
  );
};
export default RecurringPaymentMethod;
