import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { PayableIncidentFields as Fields } from './Section';
import { useGetDeleteClaimPaybleCallback } from '../../../_hooks';
import CardOfClaim from 'basic/components/Form/FormCard';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

const CalimIncidentPayable = ({ form, claimIncidentPayableId, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const deleteClaimPayble = useGetDeleteClaimPaybleCallback();

  return (
    <div>
      <CardOfClaim
        showButton={!!editable}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
        handleClick={() => deleteClaimPayble({ ...item, claimIncidentPayableId })}
      >
        <Section
          form={form}
          editable={editable}
          section="Incident.Payable"
          sectionId={claimIncidentPayableId}
        >
          <Fields.ClaimDecision />
          <Fields.BenefitItemCode />
          <Fields.PayableAmount />
          <Fields.DeductedAmount />
          <Fields.ReimbursementMultiple />
          <Fields.BenefitTypeCode />
          <Fields.CalculationAmount />
          <Fields.OffsetNonInvasiveCancerFlag />
          <Fields.OffsetNonInvasiveCancerDiagnosisDate />
          <Fields.Reasondate />

          <Fields.AnnuityInstallmentTimes />
          <Fields.AnnuityPayToTimes />
          <Fields.AnnuityRemainingTimes />

          <Fields.Remark />
        </Section>
      </CardOfClaim>
    </div>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { claimIncidentPayableId }: any
  ) => ({
    validating: formCommonController.validating,
    incidentPayableItem:
      modelnamepsace.claimEntities?.claimIncidentPayableListMap?.[claimIncidentPayableId],
  })
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, claimIncidentPayableId, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveClaimIncidentPayableItem',
              payload: {
                changedFields,
                claimIncidentPayableId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
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
