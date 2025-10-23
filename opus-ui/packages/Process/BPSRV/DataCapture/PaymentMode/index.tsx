import React from 'react';
import { FormAntCard, Visible, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import Item from './Item';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

import { localSectionConfig } from './Section';

const PaymentMode = ({ config, id }: any) => {
  const sectionProps: any = localSectionConfig['section-props'];

  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.transactionTypeCode
  );

  const visibleConditions = formUtils.queryValue(transactionTypeCode) === 'SRV002';

  return (
    <>
      {((config?.visible || sectionProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || sectionProps.visible) === Visible.Yes) && (
        <div className={styles.paymentMode}>
          <FormAntCard
            title={formatMessageApi({
              Label_BIZ_Claim: 'PaymentMode',
            })}
          >
            <Item key={id} id={id} />
          </FormAntCard>
        </div>
      )}
    </>
  );
};

export default PaymentMode;
