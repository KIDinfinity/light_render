import React from 'react';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant } from '@/components/Tenant';
import Item from './Item';
import styles from './index.less';

const ContactChangeInfo = ({ transactionId }: any) => {
  return (
    <div className={styles.contactChangeInfo}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_SRV: tenant.region({
            notMatch: 'ContactChange',
          }),
        })}
      >
        <Item transactionId={transactionId} />
      </FormAntCard>
    </div>
  );
};

export default ContactChangeInfo;
