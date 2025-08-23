import React from 'react';
import classnames from 'classnames';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import { FormAntCard } from 'basic/components/Form';
import useGetPlanInfoConfig from 'process/NB/ManualUnderwriting/_hooks/useGetPlanInfoConfig';
import useGetPolicyData from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyData';
import { localConfig } from './Section';
import styles from './index.less';

export default () => {
  const config = useGetPlanInfoConfig({
    section: 'PlanInfo-Field',
    localConfig,
  });
  const data = useGetPolicyData();
  return (
    <FormAntCard className={classnames(styles.wrap, styles.container)}>
      <div className={styles.container}>
        <ConfigurableReadOnlySection config={config} data={data} />
      </div>
    </FormAntCard>
  );
};
