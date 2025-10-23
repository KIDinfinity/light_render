import React from 'react';
import SecondaryCard from 'opus/Components/OpusCard/SecondaryCard';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import FormSection from './FormSection';
import NonThFormSection from './NonThFormSection';
import { NAMESPACE } from '../../activity.config';
import { useSelector } from 'dva';

export default ({ config }: any) => {
  const nonThCrsList =
    useSelector((state) => state[NAMESPACE]?.processData?.insuredCrs?.nonThCrsList) || [];
  const isShow = useRule({ NAMESPACE, config });
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    isShow && (
      <SecondaryCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        <FormSection />
        {nonThCrsList.map((noneThCrs, index) => (
          <NonThFormSection
            data={noneThCrs}
            key={noneThCrs?.id}
            keyIndex={index}
            editable={editable}
            nonThCrsListLength={nonThCrsList?.length}
          />
        ))}
      </SecondaryCard>
    )
  );
};
