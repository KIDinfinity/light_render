import React from 'react';
import Item from './Item';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const PosRequest = () => {
  return (
    <div className={styles.PosRequest}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.requestInformation.title',
        })}
      >
        <Item />
      </FormAntCard>
    </div>
  );
};

export default PosRequest;
