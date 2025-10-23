import React from 'react';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Item from './Item';
import styles from './index.less';
import useLoadCountrys from 'process/GeneralPOS/BaseProduct/_hooks/useLoadCountrys';

const AddressChangeInfo = ({ transactionId }: any) => {
  useLoadCountrys();
  return (
    <div className={styles.addressChangeInfo}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_SRV: 'AddressChange',
        })}
      >
        <Item transactionId={transactionId} />
      </FormAntCard>
    </div>
  );
};

export default AddressChangeInfo;
