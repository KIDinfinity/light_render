import React from 'react';
import { useSelector } from 'dva';
import OpusCard from 'opus/Components/OpusCard';
import SecondaryCard from 'opus/Components/OpusCard/SecondaryCard';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from '../../activity.config';
import FormSection from './FormSection';
import FormSection2 from './FormSection2';

import styles from './index.less';

const Label = () => {
  const healthPaQ1 = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.processData?.healthQuestionPA?.healthPaQ1
  );
  const isShow = formUtils.queryValue(healthPaQ1) === 'Yes';
  return (
    isShow && (
      <div className={styles.label}>
        {formatMessageApi({ Label_COM_DataEntry: 'healthPaQ1YesNote' })}
      </div>
    )
  );
};

export default ({ config }: any) => {
  const isShow = useRule({ NAMESPACE, config });

  return (
    isShow && (
      <OpusCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        <div className={styles.placeholder}></div>
        <SecondaryCard title={formatMessageApi({ [config?.typeCode]: 'InsuredHQ' })}>
          <FormSection />
          <Label />
          <FormSection2 />
        </SecondaryCard>
      </OpusCard>
    )
  );
};
