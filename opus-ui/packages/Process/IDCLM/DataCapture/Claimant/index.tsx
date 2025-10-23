import React from 'react';
import { NAMESPACE } from '../activity.config';
import { FormAntCard } from 'basic/components/Form';
import Claimant, { SectionTitle } from 'process/Components/BussinessControls/Claimant';
import styles from './index.less';

const ClaimantV2 = () => {
  return (
    <div className={styles.claimant}>
      <FormAntCard title={<SectionTitle />}>
        <Claimant.SectionBasic NAMESPACE={NAMESPACE} />
      </FormAntCard>
    </div>
  );
};

export default ClaimantV2;
