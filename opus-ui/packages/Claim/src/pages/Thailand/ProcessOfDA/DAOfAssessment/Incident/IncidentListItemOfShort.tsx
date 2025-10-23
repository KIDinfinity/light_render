import React from 'react';
import { Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ClaimPayableList from './ClaimPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import { useGetFirstConsultationDateRequire } from 'claim/pages/Thailand/Hooks';

export default ({ incidentNo, incidentId, hasTreatment }: any) => {
  const NAMESPACE = 'daOfClaimAssessmentController';
  const firstConsultationDateRequire = useGetFirstConsultationDateRequire({
    NAMESPACE,
    incidentId,
  });

  return (
    <Card
      title={
        <div>
          {`${formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
          })} No. ${incidentNo}`}
        </div>
      }
      bordered={false}
    >
      <ClaimPayableList incidentId={incidentId} hasTreatment={hasTreatment} />
      <IncidentListItemOfBasicInfo
        incidentId={incidentId}
        firstConsultationDateRequire={firstConsultationDateRequire}
      />
      <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
    </Card>
  );
};
