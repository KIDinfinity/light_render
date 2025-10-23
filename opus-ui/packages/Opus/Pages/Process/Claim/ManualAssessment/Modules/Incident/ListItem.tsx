import React from 'react';
import { Col, Row, Icon } from 'antd';
import Header from './Header';
import ButtonGroup from './ButtonGroup';
import Basic from './Basic';
import { FormLayoutContext } from 'basic/components/Form';
import { ReactComponent as incidentSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleIncident.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Diagnosis from '../Diagnosis';
import TreatmentList from '../Treatment/List';
import ClaimPayable from '../Payable/ClaimPayable';
import AdjustmentFactor from '../AdjustmentFactor';
import styles from './ListItem.less';

const IncidentItem = ({ incidentId, index }: any) => {
  return (
    <div className={styles.incidentItem} id={incidentId}>
      <div className={styles.titleRow}>
        <Icon component={incidentSvg} className={styles.titleIcon} />
        {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.incidentInformation' })}
        <div className={styles.gap} />
        <ButtonGroup incidentId={incidentId} />
      </div>

      <Row type="flex" gutter={0} className={styles.container}>
        <Col span={10} className={styles.left}>
          <div className={styles.incidentContainer}>
            <FormLayoutContext.ExpandProvider>
              <Header incidentId={incidentId} />
              <Basic index={index} incidentId={incidentId} />
            </FormLayoutContext.ExpandProvider>
            <Diagnosis incidentId={incidentId} />
          </div>
        </Col>
        <Col span={14} className={styles.right}>
          <ClaimPayable incidentId={incidentId} />
        </Col>
      </Row>
      <TreatmentList incidentId={incidentId} />

      <AdjustmentFactor incidentId={incidentId} />
    </div>
  );
};

export default IncidentItem;
