import React from 'react';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';
import IncidentDecisionList from './IncidentDecisionList';
import { useGetFirstConsultationDateRequire } from 'claim/pages/Thailand/Hooks';

import styles from './IncidentListItem.less';

export default ({ incidentNo, incidentId }: any) => {
  const firstConsultationDateRequire = useGetFirstConsultationDateRequire({
    NAMESPACE: 'apOfClaimAssessmentController',
    incidentId,
  });

  return (
    <div className={styles.incidentItem}>
      <Row type="flex" gutter={16}>
        <Col span={12}>
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
            <IncidentDecisionList incidentId={incidentId} />
            <IncidentListItemOfBasicInfo
              incidentId={incidentId}
              firstConsultationDateRequire={firstConsultationDateRequire}
            />
            <DiagnosisList incidentId={incidentId} />
          </Card>
        </Col>
        <Col span={12}>
          <TreatmentList incidentId={incidentId} />
        </Col>
      </Row>
    </div>
  );
};
