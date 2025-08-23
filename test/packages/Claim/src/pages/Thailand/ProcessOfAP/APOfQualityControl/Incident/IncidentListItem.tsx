import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';
import styles from './IncidentListItem.less';

class IncidentItem extends Component {
  render() {
    const { incidentNo, incidentId }: any = this.props;

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
              <IncidentListItemOfBasicInfo incidentId={incidentId} />
              <DiagnosisList incidentId={incidentId} />
            </Card>
          </Col>
          <Col span={12}>
            <TreatmentList incidentId={incidentId} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default IncidentItem;
