import React from 'react';
import OpusCard from 'opus/Components/OpusCard';
import SectionLayout from 'opus/Components/SectionComponents/SectionLayout';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from '../../activity.config';
import PayorContact from '../PayorContact';
import PayorOccupation from '../PayorOccupation';
import PayorCurrentAddr from '../PayorCurrentAddr';
import PayorHomeAddr from '../PayorHomeAddr';
import PayorDispatchAddr from '../PayorDispatchAddr';
import PayorBizAddr from '../PayorBizAddr';
import FormSection from './FormSection';

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
          <PayorContact sectionId="payorContact" />
          <PayorOccupation sectionId="payorOccupation" />
          <PayorCurrentAddr sectionId="payorCurrentAddr" />
          <PayorHomeAddr sectionId="payorHomeAddr" />
          <PayorDispatchAddr sectionId="payorDispatchAddr" />
          <PayorBizAddr sectionId="payorBizAddr" />
        </SectionLayout>
      </OpusCard>
    )
  );
};
