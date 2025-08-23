import React from 'react';
import { NAMESPACE } from '../activity.config';
import InsuredSection, { SectionTitle } from 'process/Components/BussinessControls/Insured';
import { FormAntCard } from 'basic/components/Form';
import styles from './Insured.less';

const Insured = () => {
  return (
    <div className={styles.insured}>
      <FormAntCard title={<SectionTitle />}>
        <InsuredSection.SectionBasic NAMESPACE={NAMESPACE} />
      </FormAntCard>
    </div>
  );
};

export default Insured;
