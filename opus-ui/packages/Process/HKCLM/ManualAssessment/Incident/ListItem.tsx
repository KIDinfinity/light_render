import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import Header from './Header';
import ButtonGroup from './ButtonGroup';
import Basic from './Basic';
import Check from './Check';
import Diagnosis from '../Diagnosis';
import TreatmentList from '../Treatment/List';
import TotalSummary from '../TotalSummary';
import LabelSection from '../TotalSummary/LabelSection';
import AdjustmentFactor from '../AdjustmentFactor';
import styles from './ListItem.less';

const IncidentItem = ({ incidentId, index }: any) => {
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <div className={styles.incidentItem} id={incidentId}>
      <FormAntCard>
        <Row type="flex" gutter={0} className={styles.container}>
          <Col span={10} className={styles.left}>
            <Header incidentId={incidentId} />
            <Row type="flex" gutter={16} className={styles.checkboxLayout}>
              <Col span={16}>
                <div className={styles.basic}>
                  <Basic index={index} incidentId={incidentId} />
                </div>
              </Col>
              <Col span={8}>
                <Check incidentId={incidentId} />
              </Col>
            </Row>
            <Diagnosis incidentId={incidentId} />
          </Col>
          <Col span={14} className={styles.right}>
            <ButtonGroup incidentId={incidentId} switchOn={switchOn} setSwitchOn={setSwitchOn} />
            <TotalSummary incidentId={incidentId} switchOn={switchOn} />
          </Col>
        </Row>
        <TreatmentList incidentId={incidentId} />
        <LabelSection incidentId={incidentId} trackClass={styles.right}>
          <TotalSummary incidentId={incidentId} />
        </LabelSection>
      </FormAntCard>
      <AdjustmentFactor incidentId={incidentId} />
    </div>
  );
};

export default IncidentItem;
