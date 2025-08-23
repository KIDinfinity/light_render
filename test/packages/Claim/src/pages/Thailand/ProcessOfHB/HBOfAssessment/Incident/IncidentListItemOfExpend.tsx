import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import {
  calculatPayableAmountIncidentLevel,
  calculatPayableProportionIncidentLevel,
} from 'claim/pages/utils/calculatPayableAmount';
import ClaimPayableList from './ClaimPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';

const mapStateToProps = ({ hbOfClaimAssessmentController }: any, { incidentId }: any) => {
  const { claimEntities } = hbOfClaimAssessmentController;

  const totalPayableAmount = calculatPayableAmountIncidentLevel(claimEntities, incidentId);
  const percentValue = calculatPayableProportionIncidentLevel(claimEntities, incidentId);
  return {
    totalPayableAmount,
    percentValue,
  };
};

@connect(mapStateToProps)
class IncidentItem extends Component {
  render() {
    const {
      incidentNo,
      incidentId,
      hasTreatment,
      totalPayableAmount,
      percentValue,
    }: any = this.props;

    const params = {
      totalPayableAmount,
      percentValue,
    };

    return (
      <Row type="flex" gutter={16}>
        <Col span={8}>
          <Card
            title={
              <div>
                {`${formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
                })} No. ${incidentNo}`}
              </div>
            }
            bordered={false}
          >
            <SummaryPayableAmount params={params} hasTreatment={hasTreatment} />
            <ClaimPayableList incidentId={incidentId} hasTreatment={hasTreatment} />
            <IncidentListItemOfBasicInfo incidentId={incidentId} hasTreatment={hasTreatment} />
            <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
          </Card>
        </Col>
        <Col span={16}>
          <TreatmentList incidentId={incidentId} />
        </Col>
      </Row>
    );
  }
}

export default IncidentItem;
