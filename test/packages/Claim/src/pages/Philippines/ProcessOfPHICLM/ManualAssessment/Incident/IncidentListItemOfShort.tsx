import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { Card, Button } from 'antd';
import { TREATMENTITEM, INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import { formUtils } from 'basic/components/Form';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import ClaimPayableList from './ClaimPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import styles from './IncidentListItem.less';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

@connect(
  (
    { PHCLMOfClaimAssessmentController, claimEditable, formCommonController }: any,
    { incidentId }: any
  ) => ({
    incidentNo: formUtils.queryValue(
      lodash.get(
        PHCLMOfClaimAssessmentController,
        `claimEntities.incidentListMap.${incidentId}.incidentNo`
      )
    ),
    claimNo: lodash.get(PHCLMOfClaimAssessmentController, 'claimProcessData.claimNo'),
    submited: formCommonController?.submited,
    claimPayableListMap: PHCLMOfClaimAssessmentController?.claimEntities?.claimPayableListMap,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class IncidentItem extends PureComponent {
  get exitBenefitCategory() {
    const { claimPayableListMap }: any = this.props;
    return lodash.some(
      claimPayableListMap,
      (item) =>
        item.benefitCategory === eBenefitCategory.Cashless ||
        item.benefitCategory === eBenefitCategory.Reimbursement
    );
  }

  handleAdd = () => {
    const { claimNo, incidentId, dispatch }: any = this.props;
    const treatmentId = uuidv4();
    const invoiceId = uuidv4();
    const serviceItemId = uuidv4();

    const addTreatmentItem = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      invoiceList: [invoiceId],
      treatmentNo: 1,
    };
    const addInvoiceItem = {
      ...INVOICEITEM,
      claimNo,
      id: invoiceId,
      serviceItemList: [serviceItemId],
      treatmentId,
    };
    const addServiceItem = {
      ...SERVICEITEM,
      claimNo,
      id: serviceItemId,
      invoiceId,
    };

    dispatch({
      type: 'PHCLMOfClaimAssessmentController/addTreatmentItem',
      payload: {
        incidentId,
        addTreatmentItem,
        addInvoiceItem,
        addServiceItem,
      },
    });
  };

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
      incidentNo,
      hasTreatment,
      summaryParams,
      taskNotEditable,
      submited,
    }: any = this.props;

    return (
      <Card
        title={`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
        })} No. ${incidentNo}`}
        extra={
          <div className={styles.cardExtra}>
            {!hasTreatment && !taskNotEditable && (
              <div className={styles.cardButton}>
                <Button size="small" onClick={this.handleAdd}>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
                  })}
                </Button>
                {submited && this.exitBenefitCategory && (
                  <div className={styles.cardError}>
                    <ErrorTooltipManual
                      manualErrorMessage={formatMessageApi({
                        Label_COM_WarningMessage: 'ERR_000001',
                      })}
                    />
                  </div>
                )}
              </div>
            )}
            {!taskNotEditable && <ButtonOfSmall icon="close" handleClick={this.handleDelete} />}
          </div>
        }
        bordered={false}
      >
        <SummaryPayableAmount params={summaryParams} hasTreatment="noTreatment" />
        <ClaimPayableList incidentId={incidentId} hasTreatment={hasTreatment} />
        <IncidentListItemOfBasicInfo incidentId={incidentId} hasTreatment={hasTreatment} />
        <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
      </Card>
    );
  }
}

export default IncidentItem;
