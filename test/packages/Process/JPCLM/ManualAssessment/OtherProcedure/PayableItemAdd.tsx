import React from 'react';
import { Form } from 'antd';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector, useDispatch } from 'dva';
import Section, { PayableAddFields as Fields } from './Section';
import RadioTherapyReasonDateGroupList from './RadioTherapyReasonDateGroupList';

const PayableItemAdd = ({ form, isAdd, otherProcedurePayableItemAdd, treatmentId }: any) => {
  const dispatch = useDispatch();

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const { id, radioDateList = [] } = otherProcedurePayableItemAdd || {};

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeOtherProcedurePayableItemAdd',
    });
  };
  return (
    <CardOfClaim
      className="otherProcedurePayableItem"
      showButton={!!editable}
      handleClick={handleDelete}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
    >
      <Section form={form} editable={editable} section="OtherProcedure.Payable.Add">
        <Fields.AssessorOverrideAmount />
        <Fields.AssessorOverrideMultiple />
        <Fields.BenefitItemCode payableId={id} />
        <Fields.BenefitTypeCode />
        <Fields.PolicyNo />
        <Fields.ProductCode />
        <Fields.ReimbursementMultiple />
        <Fields.Remark />
        <Fields.SystemCalculationAmount />
        <Fields.RadioTherapyReasonDate1 />
        <Fields.RadioTherapyReasonDate2 />
      </Section>
      <RadioTherapyReasonDateGroupList
        otherProcedurePayableItem={otherProcedurePayableItemAdd}
        treatmentId={treatmentId}
        radioTherapyReasonDateGroup={radioDateList}
        isAdd={isAdd}
      />
    </CardOfClaim>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveOtherProcedurePayableItemAdd',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveOtherProcedurePayableItemAdd',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { otherProcedurePayableItemAdd }: any = props;
      return formUtils.mapObjectToFields(otherProcedurePayableItemAdd);
    },
  })(PayableItemAdd)
);
