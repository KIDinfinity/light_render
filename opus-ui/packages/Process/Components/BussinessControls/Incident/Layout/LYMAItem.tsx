import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import Incident from 'process/Components/BussinessControls/Incident';
import LYMAHeader from './LYMAHeader';
import styles from './LYMA.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  index: number;
  Diagnosis: Function;
  Treatment: any;
  ButtonGroup: any;
  SummaryPayable: any;
  LabelSection: any;
  editable: boolean;
}

const LYMAItem = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  Diagnosis,
  Treatment,
  ButtonGroup,
  SummaryPayable,
  LabelSection,
}: IProps) => {
  const [switchOn, setSwitchOn] = useState(false);

  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
    incidentId,
  };
  return (
    <div className={styles.item} id={incidentId}>
      <FormAntCard>
        <Row type="flex" gutter={0} className={styles.container}>
          <Col span={10} className={styles.left}>
            <LYMAHeader {...defaultProps} />
            <Row type="flex" gutter={16} className={styles.checkboxLayout}>
              <Col span={16}>
                <div className={styles.basic}>
                  <Incident.SectionBasic {...defaultProps} />
                </div>
              </Col>
              <Col span={8}>
                <Incident.SectionCheck {...defaultProps} />
              </Col>
            </Row>
            <Diagnosis {...defaultProps} />
          </Col>
          <Col span={14} className={styles.right}>
            <ButtonGroup {...defaultProps} expand={switchOn} setExpand={setSwitchOn} />
            <SummaryPayable {...defaultProps} expand={switchOn} />
          </Col>
        </Row>
        <Treatment {...defaultProps} />
        <LabelSection {...defaultProps} trackClass={styles.right}>
          <SummaryPayable {...defaultProps} />
        </LabelSection>
      </FormAntCard>
    </div>
  );
};

export default LYMAItem;
