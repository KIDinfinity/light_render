import React from 'react';
import OpusCard from 'opus/Components/OpusCard';
import FormSection from './FormSection';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';

import { useSelector } from 'dva';

export default ({ config }: any) => {
  const beneficiaries = useSelector((state) => state[NAMESPACE]?.processData?.beneficiaries) || [];

  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const isShow = useRule({ NAMESPACE, config });
  return (
    isShow && (
      <OpusCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        {beneficiaries.map((beneficiary, index) => (
          <div className={styles.sectionCard} key={beneficiary.id}>
            <FormSection
              data={beneficiary}
              key={beneficiary.id}
              keyIndex={index}
              editable={editable}
            />
          </div>
        ))}
      </OpusCard>
    )
  );
};
