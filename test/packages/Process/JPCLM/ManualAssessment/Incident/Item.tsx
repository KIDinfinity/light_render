import React, { useMemo } from 'react';
import Short from './Short';
import Expend from './Expend';
import styles from './Item.less';
import { isEmpty } from 'lodash';
import { useSelector } from 'dva';

const IncidentItem = ({ incidentId }: any) => {
  const treatmentList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]?.treatmentList
  );
  const hasTreatment = useMemo(() => {
    return !isEmpty(treatmentList);
  }, [treatmentList]);
  return (
    <div className={styles.incidentItem}>
      {hasTreatment ? (
        <Expend incidentId={incidentId} hasTreatment={hasTreatment} />
      ) : (
        <Short incidentId={incidentId} hasTreatment={hasTreatment} />
      )}
    </div>
  );
};

export default IncidentItem;
