import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { PayableIncidentFields as Fields } from '../Section';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import styles from './AdjBasic.less';

const CalimIncidentPayable = ({
  form,
  hasTreatment,
  claimIncidentPayableId,
  incidentPayableItem,
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const layoutName = hasTreatment ? 'x-layout' : 'no-treatment-layout';

  return (
    <div>
      {incidentPayableItem.isAdjustment && (
        <>
          <span className={styles.flag} />
          <span className={styles.flagTitle}> 調整 </span>
          <span className={styles.claimNo}>NO.{incidentPayableItem.claimNo}</span>
        </>
      )}
      <Section
        form={form}
        editable={editable}
        section="Incident.Payable"
        layoutName={layoutName}
        sectionId={claimIncidentPayableId}
      >
        <Fields.AssessorOverrideAmount />
        <Fields.BenefitTypeCode />
        <Fields.ClaimDecision />
        <Fields.ProductCode />
        <Fields.Remark />
        <Fields.SystemCalculationAmount />
        <Fields.ReimbursementMultiple />
        <Fields.AssessorOverrideMultiple />
        <Fields.Reasondate />
        <Fields.CalculationAmount />
        <Fields.BenefitItemCode />
        <Fields.AnnuityPayToTimes />
        <Fields.AnnuityInstallmentTimes />
        <Fields.AnnuityRemainingTimes />
      </Section>
    </div>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { claimIncidentPayableId }: any) => ({
    validating: formCommonController.validating,
    incidentPayableItem:
      JPCLMOfClaimAssessment.claimEntities?.claimIncidentPayableListMap?.[claimIncidentPayableId],
  })
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, claimIncidentPayableId, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveClaimIncidentPayableItem',
              payload: {
                changedFields,
                claimIncidentPayableId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveClaimIncidentPayableItem',
            payload: {
              changedFields,
              claimIncidentPayableId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { incidentPayableItem }: any = props;
      return formUtils.mapObjectToFields(incidentPayableItem, {
        remark: (value: any) => transRemarkCodeToMsg(value, true),
      });
    },
  })(CalimIncidentPayable)
);
