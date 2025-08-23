import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import { isPreArrangement } from 'claim/pages/Thailand/flowConfig';
import lodash from 'lodash';
import {
  calculatPayableAmountTreatmentLevel,
  calculatPayableProportionTreatmentLevel,
} from 'claim/pages/utils/calculatPayableAmount';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import TreatmentPayableList from './TreatmentPayableList';
import ProcedureList from '../Procedure/ProcedureList';
import InvoiceList from '../Invoice/InvoiceList';
import styles from './TreatmentListItem.less';
import MainBenefitList from '../MainBenefit/MainBenefitList';

const mapStateToProps = ({ daOfClaimAssessmentController }: any, { treatmentId }: any) => {
  const { claimEntities } = daOfClaimAssessmentController;

  const totalPayableAmount = calculatPayableAmountTreatmentLevel(claimEntities, treatmentId);
  const percentValue = calculatPayableProportionTreatmentLevel(claimEntities, treatmentId);
  return {
    totalPayableAmount,
    percentValue,
    caseCategory: lodash.get(daOfClaimAssessmentController, 'claimProcessData.caseCategory'),
    invoiceListMap: lodash.get(daOfClaimAssessmentController, 'claimEntities.invoiceListMap'),
  };
};

@connect(mapStateToProps)
class TreatmentItem extends Component {
  state = {
    cardStatus: true, // 面板的显示状态，true为打开状态，false为收起状态
  };

  handleDelete = () => {
    const { dispatch, treatmentId, incidentId }: any = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/removeTreatmentItem',
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  onClose = () => {
    this.setState({
      cardStatus: false,
    });
  };

  onOpen = () => {
    this.setState({
      cardStatus: true,
    });
  };

  render() {
    const {
      incidentId,
      treatmentId,
      treatmentNo,
      totalPayableAmount,
      percentValue,
      caseCategory,
      invoiceListMap,
    }: any = this.props;

    const params = {
      totalPayableAmount,
      percentValue,
    };
    const isPAAndNoInvoice = isPreArrangement(caseCategory) && lodash.isEmpty(invoiceListMap);

    return (
      <div className={styles.treatmentItem}>
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <Card
              title={`${formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
              })} No. ${treatmentNo}`}
              bordered={false}
              style={{ width: '100%' }}
            >
              {!isPAAndNoInvoice && <SummaryPayableAmount params={params} />}
              <TreatmentPayableList incidentId={incidentId} treatmentId={treatmentId} />
              <TreatmentListItemOfBasicInfo incidentId={incidentId} treatmentId={treatmentId} />
              <MainBenefitList treatmentId={treatmentId} />
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
