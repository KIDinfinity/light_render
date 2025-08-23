import React from 'react';

import { useSelector } from 'dva';
import Incident, { SectionTitle } from 'process/Components/BussinessControls/Incident';
import styles from './LYMA.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  editable: boolean;
}

const LYMAHeader = (props: IProps) => {
  const incidentItem = useSelector(
    ({ [props.NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.incidentListMap?.[props.incidentId]
  );

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <SectionTitle suffix={` No. ${incidentItem.incidentNo}`} />
      </div>
      <div className={styles.section}>
        <Incident.SectionHeader {...props} />
      </div>
    </div>
  );
};

export default LYMAHeader;
