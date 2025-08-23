import React from 'react';
import { Col, Row } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import { Incident } from 'process/Components/BussinessControls';
import LYDCBar from './LYDCBar';
import styles from './LYDC.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  editable: boolean;
  PopUpInvoice: Function;
  Treatment: Function;
  Diagnosis: Function;
}
const LYDCItem = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  Treatment,
  Diagnosis,
  PopUpInvoice,
}: IProps) => {
  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
    incidentId,
  };

  return (
    <div className={styles.item}>
      <FormAntCard>
        <LYDCBar {...defaultProps} />
        <Row type="flex" gutter={16}>
          <Col span={8}>
            <div className={styles.basic}>
              <Incident.SectionBasic {...defaultProps} />
            </div>
          </Col>
          <Col span={4}>
            <Incident.SectionCheck {...defaultProps} />
          </Col>
          <Col span={12}>
            <Diagnosis {...defaultProps} />
          </Col>
        </Row>
        <Treatment {...defaultProps} />
        <PopUpInvoice {...defaultProps} />
      </FormAntCard>
    </div>
  );
};

export default LYDCItem;
