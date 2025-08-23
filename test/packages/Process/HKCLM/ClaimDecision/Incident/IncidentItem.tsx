import React from 'react';
import { Col, Row } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import Header from './Header';
import Basic from './Basic';
import Check from '../../DataCapture/Incident/Check';
import Diagnosis from './Diagnosis';
import styles from '../../DataCapture/Incident/ListItem.less';

const IncidentItem = ({ incidentId, index }: any) => (
  <div className={styles.incidentItem}>
    <FormAntCard>
      <Header incidentId={incidentId} />
      <Row type="flex" gutter={16}>
        <Col span={8}>
          <div className={styles.basic}>
            <Basic index={index} incidentId={incidentId} />
          </div>
        </Col>
        <Col span={4}>
          <Check incidentId={incidentId} />
        </Col>
        <Col span={12}>
          <Diagnosis incidentId={incidentId} />
        </Col>
      </Row>
    </FormAntCard>
  </div>
);

export default IncidentItem;
