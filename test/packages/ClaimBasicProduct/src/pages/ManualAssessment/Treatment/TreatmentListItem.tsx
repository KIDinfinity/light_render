import React, { PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {
  calculatPayableAmountTreatmentLevel,
  calculatPayableProportionTreatmentLevel,
} from 'claim/pages/utils/calculatPayableAmount';
import SummaryCurrencyPayableAmount from 'claim/components/SummaryCurrencyPayableAmount';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import TreatmentPayableList from './TreatmentPayableList';
import ProcedureList from '../Procedure/ProcedureList';
import InvoiceList from '../Invoice/InvoiceList';
import styles from './TreatmentListItem.less';

const mapStateToProps = ({ bpOfClaimAssessmentController }: any, { treatmentId }: any) => {
  const { claimEntities } = bpOfClaimAssessmentController;

  const totalPayableAmount = calculatPayableAmountTreatmentLevel(claimEntities, treatmentId);
  const percentValue = calculatPayableProportionTreatmentLevel(claimEntities, treatmentId);
  return {
    totalPayableAmount,
    percentValue,
    treatmentItem: bpOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId],
  };
};

@connect(mapStateToProps)
class TreatmentItem extends PureComponent {
  render() {
    const { incidentId, treatmentId, treatmentItem, totalPayableAmount, percentValue } = this.props;

    const summaryParams = {
      totalPayableAmount,
      percentValue,
    };

    return (
      <div className={styles.treatmentItem}>
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <Card
              title={`${formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
              })} No. ${treatmentItem.treatmentNo}`}
              bordered={false}
              style={{ width: '100%' }}
            >
              <SummaryCurrencyPayableAmount params={summaryParams} hiddenPrefix />
              <TreatmentPayableList incidentId={incidentId} treatmentId={treatmentId} />
              <TreatmentListItemOfBasicInfo incidentId={incidentId} treatmentId={treatmentId} />
              <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
            </Card>
          </Col>
          <Col span={12}>
            <InvoiceList incidentId={incidentId} treatmentId={treatmentId} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TreatmentItem;
