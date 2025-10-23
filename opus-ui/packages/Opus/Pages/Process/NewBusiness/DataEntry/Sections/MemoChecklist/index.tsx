import React from 'react';
import OpusCard from 'opus/Components/OpusCard';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from '../../activity.config';
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
      </OpusCard>
    )
  );
};
