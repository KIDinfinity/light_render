import React from 'react';
import OpusCard from 'opus/Components/OpusCard';
import SectionLayout from 'opus/Components/SectionComponents/SectionLayout';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from '../../activity.config';
import FormSection from './FormSection';
import FormSection2 from './FormSection2';
import ProductInfoBasicPlan from '../ProductInfoBasicPlan';
import ProductInfoRider from '../ProductInfoRider';
import styles from './index.less';

export default ({ config }: any) => {
  const isShow = useRule({ NAMESPACE, config });
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    isShow && (
      <OpusCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        <div className={styles.sectionCard}>
          <FormSection />
        </div>
        <SectionLayout>
          <ProductInfoBasicPlan sectionId="productInfoBasicPlan" editable={editable} />
          <ProductInfoRider sectionId="productInfoRider" editable={editable} />
        </SectionLayout>
        <div className={styles.sectionCard}>
          <FormSection2 />
          <Button
            onClick={() => {
              dispatch({
                type: `${NAMESPACE}/calPrem`,
                payload: {
                  // salesChannel,
                },
              });
            }}
            disabled={!editable}
          >
            {formatMessageApi({ Label_BPM_Button: 'calculatePremium' })}
          </Button>
        </div>
      </OpusCard>
    )
  );
};
