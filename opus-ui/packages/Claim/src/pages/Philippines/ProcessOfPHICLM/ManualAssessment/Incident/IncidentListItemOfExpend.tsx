import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import { formUtils } from 'basic/components/Form';
import rulesOfDataCaptrue from '@/utils/rulesOfDataCaptrue';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import ClaimPayableList from './ClaimPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';

import styles from './IncidentListItem.less';

@connect(({ PHCLMOfClaimAssessmentController, claimEditable }: any, { incidentId }: any) => ({
  incidentNo: formUtils.queryValue(
    lodash.get(
      PHCLMOfClaimAssessmentController,
      `claimEntities.incidentListMap.${incidentId}.incidentNo`
    )
  ),
  taskNotEditable: claimEditable.taskNotEditable,
  incidentItem: PHCLMOfClaimAssessmentController.claimEntities.incidentListMap?.[incidentId],
}))
class IncidentItem extends PureComponent {
  handleDelete = () => {
    const { dispatch, incidentId }: any = this.props;

    dispatch({
      type: 'PHCLMOfClaimAssessmentController/removeIncidentItem',
      payload: {
        incidentId,
      },
    });
  };

  render() {
    const {
      incidentId,
      incidentItem,
      submited,
      taskNotEditable,
      summaryParams,
      incidentNo,
    }: any = this.props;

    const showOutPatientHint =
      !rulesOfDataCaptrue.calcTreatmentTypeOK(incidentItem, 'OP').isOK === true;
    const showInPatientHint =
      !rulesOfDataCaptrue.calcTreatmentTypeOK(incidentItem, 'IP').isOK === true;
    const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

    return (
      <Row type="flex" gutter={16}>
        <Col span={8}>
          <Card
            title={
              <div>
                <div className={styles.errorTooltipWrapper}>
                  {showOutPatientHint && submited && (
                    <ErrorTooltipManual manualErrorMessage="[treatment] should at least have one outPatient treatment record when claimType contain outPatient." />
                  )}
                  {showInPatientHint && submited && (
                    <ErrorTooltipManual manualErrorMessage="[treatment] should at least have one inPatient treatment record when claimType contain inPatient." />
                  )}
                </div>
                {`${formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
                })} No. ${incidentNo}`}
              </div>
            }
            extra={
              <div className={styles.cardExtra}>
                {!taskNotEditable && <ButtonOfSmall icon="close" handleClick={this.handleDelete} />}
              </div>
            }
            bordered={false}
          >
            <SummaryPayableAmount params={summaryParams} hasTreatment={hasTreatment} />
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
