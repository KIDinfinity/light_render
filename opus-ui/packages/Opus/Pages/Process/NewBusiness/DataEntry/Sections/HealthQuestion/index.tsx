import React from 'react';
import OpusCard from 'opus/Components/OpusCard';
import SectionLayout from 'opus/Components/SectionComponents/SectionLayout';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from '../../activity.config';
import InsuredHQ from '../InsuredHQ';
import PayorHQ from '../PayorHQ';

import styls from './index.less';

export default ({ config }: any) => {
  const isShow = useRule({ NAMESPACE, config });

  return (
    isShow && (
      <OpusCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        <div className={styls.placeholder}></div>
        <SectionLayout>
          <InsuredHQ sectionId="insuredHQ" />
          <PayorHQ sectionId="payorHQ" />
        </SectionLayout>
      </OpusCard>
    )
  );
};
