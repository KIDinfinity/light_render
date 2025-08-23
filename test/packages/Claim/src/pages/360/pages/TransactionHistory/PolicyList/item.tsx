import React from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetDataBySection from 'claim/pages/360/pages/TransactionHistory/_hooks/useGetDataBySection';
import { inlineFields } from './Section/index.trans.config';
import { localConfig, localSectionConfig } from './Section';
import ReadOnlySection from './ReadOnlySection/index';
import styles from './index.less';
import { tenant } from '@/components/Tenant';

export default ({ policyItem }: any) => {
  const isMY = tenant.isMY();
  const config = useGetSectionAtomConfig({ section: localSectionConfig?.section, localConfig });

  if (isMY) {
    config.forEach((fieldConfig: any) => {
      if (
        fieldConfig.field === 'sourceSystem' ||
        fieldConfig.field === 'reverseFlag' ||
        fieldConfig.field === 'transactionCode'
      ) {
        fieldConfig['field-props'].visible = 'N';
      }
    });
  }

  const dataBySection = useGetDataBySection({
    data: policyItem,
    config,
  });

  return (
    <div className={styles.transactionItem}>
      <ReadOnlySection data={dataBySection} inlineFields={inlineFields} />
    </div>
  );
};
