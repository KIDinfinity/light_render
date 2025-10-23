import { FormAntCard } from 'basic/components/Form';
import { useDispatch } from 'dva';
import React, { useEffect } from 'react';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import Item from './Item';
import PayInOptionSection from './PayInOptionSection';

const RecurringPaymentMethod = ({ transactionId }) => {
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
  return (
    <>
      <FormAntCard>
        <div className={styles.payInOption}>
          <PayInOptionSection transactionId={transactionId} />
        </div>

        <Item transactionId={transactionId} />
      </FormAntCard>
    </>
  );
};
export default RecurringPaymentMethod;
