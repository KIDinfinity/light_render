import React from 'react';
import { Col, Row } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import Header from './Header';
import Basic from './Basic';
import Diagnosis from '../Diagnosis';
import TreatmentList from '../Treatment/List';
import styles from './ListItem.less';
import PopUpInvoice from '../InvoicePop';

const IncidentItem = ({ incidentId, index }: any) => {
  return (
    <div className={styles.incidentItem}>
      <FormAntCard>
        <Header incidentId={incidentId} />
        <Row type="flex" gutter={16}>
          <Col span={8}>
            <div className={styles.basic}>
              <Basic index={index} incidentId={incidentId} />
            </div>
          </Col>
          <Col span={4} />
          <Col span={12}>
            <Diagnosis incidentId={incidentId} />
          </Col>
        </Row>
        <TreatmentList incidentId={incidentId} />
        <PopUpInvoice incidentId={incidentId} />
      </FormAntCard>
    </div>
  )
};

export default IncidentItem;
