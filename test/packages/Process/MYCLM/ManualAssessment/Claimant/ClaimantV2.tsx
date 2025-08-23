import React from 'react';
import { NAMESPACE } from '../activity.config';
import ClaimantSection, { SectionTitle } from 'process/Components/BussinessControls/Claimant';
import { FormAntCard } from 'basic/components/Form';
import styles from './Claimant.less';

const Claimant = () => {
  return (
    <div className={styles.claimant}>
      <FormAntCard title={<SectionTitle />}>
        <ClaimantSection.SectionBasic NAMESPACE={NAMESPACE} />
      </FormAntCard>
    </div>
  );
};

export default Claimant;
