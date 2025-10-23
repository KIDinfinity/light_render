import React from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetDataBySection from '../_hooks/useGetDataBySection';
import { localConfig, localSectionConfig } from './Section';
import ReadOnlySection from './ReadOnlySection/index';
import styles from './index.less';

export default ({ policyItem }: any) => {
  const config = useGetSectionAtomConfig({ section: localSectionConfig?.section, localConfig });
  const dataBySection = useGetDataBySection({
    data: policyItem,
    config,
  });

  return (
    <div className={styles.transactionItem}>
      <ReadOnlySection data={dataBySection} />
    </div>
  );
};
