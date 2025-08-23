import React, { PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { calculatPayableAmountTreatmentLevel } from 'claim/pages/utils/calculatPayableAmount';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import TreatmentPayableList from './TreatmentPayableList';
import ProcedureList from '../Procedure/ProcedureList';
import InvoiceList from '../Invoice/InvoiceList';
import styles from './TreatmentListItem.less';

const mapStateToProps = (
  { PHCLMOfClaimAssessmentController, claimEditable }: any,
  { treatmentId }: any
) => {
  const { claimEntities } = PHCLMOfClaimAssessmentController;

  const totalPayableAmount = calculatPayableAmountTreatmentLevel(claimEntities, treatmentId);
  const percentValue = totalPayableAmount > 0 ? 100 : 0;
  return {
    totalPayableAmount,
    percentValue,
    treatmentItem: PHCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId],
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class TreatmentItem extends PureComponent {
  handleDelete = () => {
    const { dispatch, treatmentId, incidentId } = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/removeTreatmentItem',
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  render() {
    const {
      incidentId,
      treatmentId,
      treatmentItem,
      totalPayableAmount,
      percentValue,
      taskNotEditable,
    } = this.props;

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
              extra={
                <div className={styles.cardExtra}>
                  {!taskNotEditable && (
                    <ButtonOfSmall icon="close" handleClick={this.handleDelete} />
                  )}
                </div>
              }
            >
              <SummaryPayableAmount params={summaryParams} />
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
