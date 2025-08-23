import React from 'react';
import { NAMESPACE } from './activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ClaimantSection from 'process/Components/BussinessControls/Claimant';
import { FormAntCard } from 'basic/components/Form';
import styles from '../DataCapture/Claimant/Claimant.less';

const SectionTitle = () => {
  return (
    <div className={styles.title}>
      {formatMessageApi({ Label_BIZ_Claim: 'app.navigator.task-detail-of-assurance-claim.title.policy-owner-information'})}
    </div>
  )
}

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
