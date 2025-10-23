import React from 'react';
import SecondaryCard from 'opus/Components/OpusCard/SecondaryCard';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import Button from '../../components/Button';
import FormSection from './FormSection';
import Register from 'opus/Components/SectionComponents/Register';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from '../../activity.config';

export default ({ config, editable }: any) => {
  const productInfoRiders =
    useSelector((state) => state[NAMESPACE]?.processData?.productInfoRiders) || [];
  const dispatch = useDispatch();

  return (
    <SecondaryCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
      {productInfoRiders.map((productInfoRider, index) => (
        <div key={productInfoRider.id}>
          <FormSection
            data={productInfoRider}
            key={productInfoRider.id}
            keyIndex={index}
            editable={editable}
          />
        </div>
      ))}
    </SecondaryCard>
  );
};
