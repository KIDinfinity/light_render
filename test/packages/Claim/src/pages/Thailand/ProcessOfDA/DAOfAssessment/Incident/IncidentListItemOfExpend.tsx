import React from 'react';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import ClaimPayableList from './ClaimPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';
import {
  useGetFirstConsultationDateRequire,
  useGetSummaryPayableData,
  useGetPAAndNoInvoice,
} from 'claim/pages/Thailand/Hooks';

export default ({ hasTreatment, incidentNo, incidentId }: any) => {
  const NAMESPACE = 'daOfClaimAssessmentController';

  const firstConsultationDateRequire = useGetFirstConsultationDateRequire({
    NAMESPACE,
    incidentId,
  });

  const isPAAndNoInvoice = useGetPAAndNoInvoice({ NAMESPACE });
  const summaryPayableData = useGetSummaryPayableData({ NAMESPACE, incidentId });

  return (
    <Row type="flex" gutter={16}>
      <Col span={8}>
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
          {!isPAAndNoInvoice && (
            <SummaryPayableAmount params={summaryPayableData} hasTreatment={hasTreatment} />
          )}
          <ClaimPayableList incidentId={incidentId} hasTreatment={hasTreatment} />
          <IncidentListItemOfBasicInfo
            incidentId={incidentId}
            firstConsultationDateRequire={firstConsultationDateRequire}
          />
          <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
        </Card>
      </Col>
      <Col span={16}>
        <TreatmentList incidentId={incidentId} />
      </Col>
    </Row>
  );
};
