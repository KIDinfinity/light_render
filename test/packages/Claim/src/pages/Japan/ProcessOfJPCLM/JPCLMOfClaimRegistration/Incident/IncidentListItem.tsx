import React, { PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';
import styles from './IncidentListItem.less';

class IncidentItem extends PureComponent {
  render() {
    const { incidentNo, incidentId, dataEditable, handleDelete }: any = this.props;

    return (
      <div className={styles.incidentItem}>
        <Row type="flex" gutter={24}>
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
              extra={
                <div className={styles.cardExtra}>
                  {dataEditable && (
                    <ButtonOfSmall icon="close" handleClick={() => handleDelete(incidentId)} />
                  )}
                </div>
              }
            >
              <IncidentListItemOfBasicInfo incidentId={incidentId} dataEditable={dataEditable} />
              <DiagnosisList incidentId={incidentId} dataEditable={dataEditable} />
            </Card>
          </Col>
          <Col span={12}>
            <TreatmentList incidentId={incidentId} dataEditable={dataEditable} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default IncidentItem;
