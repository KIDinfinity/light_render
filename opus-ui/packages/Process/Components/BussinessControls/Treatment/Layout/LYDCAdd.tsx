import React from 'react';
import { useSelector } from 'dva';

import { SectionCard } from 'basic/components/Form';
import { SectionTitle } from '../Sections';
import { tenant, Region } from '@/components/Tenant';
import { Treatment } from 'process/Components/BussinessControls';
import styles from './Common.less';

interface IProps {
  NAMESPACE: string;
  treatmentList: any[];
  incidentId: string;
}

const Add = ({ NAMESPACE, treatmentList, incidentId }: IProps) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const show = tenant.region({
    [Region.TH]: false,
    [Region.ID]: false,
    notMatch: true,
  })

  return (
    <>
      {editable && show && (
        <SectionCard
          title={
            <div className={styles.header}>
              <SectionTitle suffix={` No. ${Number(treatmentList?.length) + 1}`} />
              <div className={styles.section}>
                <Treatment.SectionAdd NAMESPACE={NAMESPACE} incidentId={incidentId} />
              </div>
            </div>
          }
          hasContent={false}
          className={styles.treatmentAdd}
        />
      )}
    </>
  );
};

export default Add;
