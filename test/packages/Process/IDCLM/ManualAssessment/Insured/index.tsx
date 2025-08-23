import React from 'react';
import { NAMESPACE } from '../activity.config';
import Insured, { SectionTitle } from 'process/Components/BussinessControls/Insured';
import { FormAntCard } from 'basic/components/Form';
import styles from './index.less';

const InsuredV2 = () => {
  return (
    <div className={styles.insured}>
      <FormAntCard title={<SectionTitle />}>
        <Insured.SectionBasic NAMESPACE={NAMESPACE} />
      </FormAntCard>
    </div>
  );
};

export default InsuredV2;
