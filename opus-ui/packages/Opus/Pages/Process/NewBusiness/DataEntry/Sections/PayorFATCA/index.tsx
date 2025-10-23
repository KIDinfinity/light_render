import React from 'react';
import SecondaryCard from 'opus/Components/OpusCard/SecondaryCard';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import FormSection from './FormSection';
import { NAMESPACE } from '../../activity.config';

export default ({ config }: any) => {
  const isShow = useRule({ NAMESPACE, config });

  return (
    isShow && (
      <SecondaryCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        <FormSection />
      </SecondaryCard>
    )
  );
};
