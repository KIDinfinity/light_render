import React from 'react';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Item from './Item';

const PaymentTrack = ({transactionId}) => {
  return (
    <div className={styles.transactionTypeSection}>
      <FormAntCard
        title={formatMessageApi({
          Label_COM_General: 'PaymentTrackDetails',
        })}
      >
        <Item transactionId={transactionId } />
      </FormAntCard>
    </div>
  );
};

export default PaymentTrack;
