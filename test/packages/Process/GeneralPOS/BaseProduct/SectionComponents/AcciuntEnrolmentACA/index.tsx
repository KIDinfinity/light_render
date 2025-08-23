import { useDispatch, useSelector } from 'dva';
import React, { useEffect } from 'react';
import { NAMESPACE } from '../../activity.config';
import Item from './Item';

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
  return <Item transactionId={transactionId} />;
};
export default RecurringPaymentMethod;
