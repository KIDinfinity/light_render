import React from 'react';
import { Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';

export default ({ incidentNo, incidentId, hasTreatment }: any) => {
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
      <IncidentListItemOfBasicInfo incidentId={incidentId} />
      <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
    </Card>
  );
};
