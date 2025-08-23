import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';

import { FormCard, formUtils } from 'basic/components/Form';
import Section, { PayableAddFields as Fields } from './Section';

const ProcedurePayableItemAdd = ({
  form,
  procedurePayableItemAdd,
  curProcedurePayableItemList,
}: any) => {
  const dispatch = useDispatch();

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeProcedurePayableItemAdd',
    });
  };

  return (
    <FormCard
      className="procedurePayableItem"
      showButton={!!editable}
      handleClick={handleDelete}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
    >
      <Section form={form} editable={editable} section="Procedure.Payable.Add">
        <Fields.AssessorOverrideAmount />
        <Fields.AssessorOverrideMultiple />
        <Fields.BenefitItemCode
          procedurePayableItemAdd={procedurePayableItemAdd}
          curProcedurePayableItemList={curProcedurePayableItemList}
        />
        <Fields.BenefitTypeCode />
        <Fields.PolicyNo procedurePayableItemAdd={procedurePayableItemAdd} />
        <Fields.ProductCode />
        <Fields.ReimbursementMultiple />
        <Fields.Remark />
        <Fields.SystemCalculationAmount />
      </Section>
    </FormCard>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveProcedurePayableItemAdd',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveProcedurePayableItemAdd',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { procedurePayableItemAdd }: any = props;

      return formUtils.mapObjectToFields(procedurePayableItemAdd);
    },
  })(ProcedurePayableItemAdd)
);
