import React from 'react';
import styles from './index.less';
import Item from './Item';
import { SectionTitle } from './Section';
import { FormAntCard } from 'basic/components/Form';

const InstantPay = ({ transactionId }) => {
  return (
    <div className={styles.wrapper}>
      <FormAntCard title={<SectionTitle />}>
        <Item transactionId={transactionId} />
      </FormAntCard>
    </div>
  );
};

export default InstantPay;
