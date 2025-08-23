import React from 'react';
import { FormAntCard } from 'basic/components/Form';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import { localConfig, SectionTable } from './Section';
import { useSelector } from 'dva';
import { SectionTitle } from './Section';
import styles from './index.less';

const PayInDetail = ({ transactionId }: any) => {
  const payInDetailList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.payInDetailList
  );

  return (
    <div className={styles.payInDetailSection}>
      <FormAntCard title={<SectionTitle />}>
        <SectionTable
          section="PayInDetail"
          config={localConfig}
          dataSource={(payInDetailList || []).map((item, index) => index)}
        >
          <Item transactionId={transactionId} />
        </SectionTable>
      </FormAntCard>
    </div>
  );
};

export default PayInDetail;
