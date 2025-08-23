import { useDispatch, useSelector } from 'dva';
import React, { useEffect } from 'react';
import { NAMESPACE } from '../../activity.config';
import Item from './Item';

const ChangeRenewalMethod = ({ transactionId }) => {
  const dispatch = useDispatch();
  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.transactionTypeCode
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getAllBank`,
      payload: { transactionTypeCode },
    });
  }, [transactionTypeCode]);

  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/ChangeRenewalMethodInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId]);
  return <Item transactionId={transactionId} />;
};
export default ChangeRenewalMethod;
