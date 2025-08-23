import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';

@connect()
class IncidentItem extends Component {
  render() {
    const { incidentNo, incidentId, hasTreatment }: any = this.props;

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
            <IncidentListItemOfBasicInfo incidentId={incidentId} hasTreatment={hasTreatment} />
            <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
          </Card>
        </Col>
        <Col span={16}>
          <TreatmentList incidentId={incidentId} />
        </Col>
      </Row>
    );
  }
}

export default IncidentItem;
