import React from 'react';

import { useSelector } from 'dva';
import { SectionTitle } from '../Sections';
import Treatment from '..';
import styles from './Common.less';

interface IProps {
  NAMESPACE: string;
  incidentId: string;
  treatmentId: string;
}

const LTHeader = ({ NAMESPACE, incidentId, treatmentId }: IProps) => {
  const treatmentNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap?.[treatmentId]?.treatmentNo
  );

  return (
    <div className={styles.header}>
      <SectionTitle suffix={` No. ${treatmentNo}`} />
      <div className={styles.section}>
        <Treatment.SectionHeader
          NAMESPACE={NAMESPACE}
          incidentId={incidentId}
          treatmentId={treatmentId}
        />
      </div>
    </div>
  );
};

export default LTHeader;
