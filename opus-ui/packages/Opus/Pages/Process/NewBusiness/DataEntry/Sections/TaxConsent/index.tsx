import React from 'react';
import { useSelector } from 'dva';
import OpusCard from 'opus/Components/OpusCard';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from '../../activity.config';
import FormSection from './FormSection';
import FormSection2 from './FormSection2';

import styles from './index.less';

const Label = () => {
  const taxConsentOption = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.processData?.taxConsent?.taxConsentOption
  );
  const insuredNationality = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.insuredInfo?.nationality
  );
  const isShow =
    formUtils.queryValue(taxConsentOption) === 'Yes' &&
    formUtils.queryValue(insuredNationality) !== 'TH';
  return (
    isShow && (
      <div className={styles.label}>
        {formatMessageApi({ Label_COM_DataEntry: 'taxConsentNonThNote' })}
      </div>
    )
  );
};

export default ({ config }: any) => {
  const isShow = useRule({ NAMESPACE, config });

  return (
    isShow && (
      <OpusCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        <div className={styles.sectionCard}>
          <FormSection />
          <Label />
          <FormSection2 />
        </div>
      </OpusCard>
    )
  );
};
