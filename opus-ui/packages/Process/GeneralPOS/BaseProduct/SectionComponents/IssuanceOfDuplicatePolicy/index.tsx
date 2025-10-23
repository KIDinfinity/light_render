
import React, { useEffect } from 'react';
import {  useDispatch } from 'dva';
import Item from './Item';
import styles from './index.less';
import { NAMESPACE } from '../../activity.config';

const IssuanceOfDuplicatePolicy = ({ transactionId }: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/getTimesOfReplacement`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId])

  return (
    <div className={styles.duplicatePolicy}>
        <Item transactionId={transactionId} />
    </div>
  );
};

export default IssuanceOfDuplicatePolicy;
