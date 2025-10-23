import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import Section, { PayableLifeFields as Fields } from './Section';
import CardOfClaim from 'basic/components/Form/FormCard';
import { useGetDeleteClaimPaybleCallback } from '../../../_hooks';

const ClaimPayableListItemOfLife = ({ form, incidentPayableItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const deleteClaimPayble = useGetDeleteClaimPaybleCallback();

  return (
    <CardOfClaim
      showButton={!!editable}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
      handleClick={() => deleteClaimPayble(incidentPayableItem)}
    >
      <Section form={form} editable={editable} section="Incident.Payable.Life">
        <Fields.ClaimDecision incidentPayableItem={incidentPayableItem} />

        <Fields.BenefitItemCode />
        <Fields.PayableAmount />
        <Fields.ReimbursementMultiple />
        <Fields.BenefitTypeCode />
        <Fields.CalculationAmount />
        <Fields.Reasondate />

        <Fields.AnnuityInstallmentTimes />
        <Fields.AnnuityPayToTimes />
        <Fields.AnnuityRemainingTimes />

        <Fields.Remark />
      </Section>
    </CardOfClaim>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentPayableItem, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveLifePayable',
              payload: {
                changedFields,
                incidentPayableId: incidentPayableItem?.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveLifePayable',
            payload: {
              changedFields,
              incidentPayableId: incidentPayableItem?.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const {
        incidentPayableItem: { lifePayable },
      }: any = props;
      return formUtils.mapObjectToFields(lifePayable);
    },
  })(ClaimPayableListItemOfLife)
);
