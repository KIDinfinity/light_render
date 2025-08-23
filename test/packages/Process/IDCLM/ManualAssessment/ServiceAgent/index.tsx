import React from 'react';
import { NAMESPACE } from '../activity.config';
import { FormAntCard } from 'basic/components/Form';
import ServiceAgent, { SectionTitle } from 'process/Components/BussinessControls/ServiceAgent';
import styles from './index.less';

const ServiceAgentV2 = () => {
  return (
    <div className={styles.policyAgent}>
      <FormAntCard title={<SectionTitle />}>
        <ServiceAgent.SectionBasic NAMESPACE={NAMESPACE} />
      </FormAntCard>
    </div>
  );
};

export default ServiceAgentV2;
