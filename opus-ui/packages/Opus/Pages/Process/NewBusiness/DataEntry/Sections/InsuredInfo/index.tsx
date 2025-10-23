import React from 'react';
import OpusCard from 'opus/Components/OpusCard';
import SectionLayout from 'opus/Components/SectionComponents/SectionLayout';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from '../../activity.config';
import FormSection from './FormSection';
import InsuredContact from '../InsuredContact';
import InsuredOccupation from '../InsuredOccupation';
import InsuredCurrentAddr from '../InsuredCurrentAddr';
import InsuredHomeAddr from '../InsuredHomeAddr';
import InsuredDispatchAddr from '../InsuredDispatchAddr';
import InsuredBizAddr from '../InsuredBizAddr';
import styles from './index.less';

export default ({ config }: any) => {
  const isShow = useRule({ NAMESPACE, config });

  return (
    isShow && (
      <OpusCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        <div className={styles.sectionCard}>
          <FormSection />
        </div>
        <SectionLayout>
          <InsuredContact sectionId="insuredContact" />
          <InsuredOccupation sectionId="insuredOccupation" />
          <InsuredCurrentAddr sectionId="insuredCurrentAddr" />
          <InsuredHomeAddr sectionId="insuredHomeAddr" />
          <InsuredDispatchAddr sectionId="insuredDispatchAddr" />
          <InsuredBizAddr sectionId="insuredBizAddr" />
        </SectionLayout>
      </OpusCard>
    )
  );
};
