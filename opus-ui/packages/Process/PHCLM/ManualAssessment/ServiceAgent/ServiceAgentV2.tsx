import React from 'react';
import { NAMESPACE } from '../activity.config';
import { FormAntCard } from 'basic/components/Form';
import ServiceAgentSection, { SectionTitle } from 'process/Components/BussinessControls/ServiceAgent';
import styles from './ServiceAgent.less';

const ServiceAgent = () => {
  return (
    <div className={styles.policyAgent}>
      <FormAntCard title={<SectionTitle />}>
        <ServiceAgentSection.SectionBasic NAMESPACE={NAMESPACE} />
      </FormAntCard>
    </div>
  );
};

export default ServiceAgent;
