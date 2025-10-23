import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import AdjustmentWrap, { InnerWrap } from '../AdjustmentWrap';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import Section, { PayableFields as Fields } from './Section';

const TreatmentPayableListItem = ({
  dispatch,
  form,
  item: { id, treatmentPayableId, isAdjustment, originPayable },
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const render = ({
    editable: renderEditable,
    form: renderForm,
    title,
    className,
    adjustmentDelete,
  }: {
    editable: boolean;
    adjustmentDelete?: boolean;
    form: any;
    title?: string;
    className?: string;
  }) => (
    <CardOfClaim
      showButton={!!renderEditable || adjustmentDelete}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
      handleClick={() => {
        dispatch({
          type: `${NAMESPACE}/removeProcedurePayableItem`,
          payload: {
            treatmentPayableId,
            id,
          },
        });
      }}
      className={className}
    >
      <InnerWrap title={title}>
        <Section form={renderForm} editable={renderEditable} section="Payable.ProcedurePayable">
          <Fields.BenefitItemCode />
          <Fields.PayableAmount />
          <Fields.ReimbursementMultiple />
          <Fields.Remark />
          <Fields.PayableDays />
          {/* <Fields.PolicyNo />
          <Fields.ProductCode /> */}
          <Fields.BenefitTypeCode />
          <Fields.ReversalFlag />
        </Section>
      </InnerWrap>
    </CardOfClaim>
  );

  return (
    <AdjustmentWrap
      originItem={originPayable}
      isAdjustment={isAdjustment}
      form={form}
      render={render}
      editable={editable}
    />
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const {
        dispatch,
        item: { id },
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveProcedurePayableItem',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(TreatmentPayableListItem)
);
