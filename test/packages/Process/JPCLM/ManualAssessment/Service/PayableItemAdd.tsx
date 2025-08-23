import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';

import { FormCard, formUtils } from 'basic/components/Form';
import Section, { PayableAddFields as Fields } from './Section';

const InvoiceItemServiceItemPayableListItemAdd = ({
  form,
  serviceItemPayableDetail,
  curServicePayableList,
  invoiceId,
}: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeServicePayableAddItem',
    });
  };

  return (
    <FormCard
      className="servicePayableItem"
      showButton
      handleClick={() => {
        handleDelete();
      }}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
    >
      <Section form={form} editable={editable} section="ServiceItem.Payable.Add">
        <Fields.AssessorOverrideAmount serviceItemPayableDetail={serviceItemPayableDetail} />
        <Fields.BenefitItemCode
          curServicePayableList={curServicePayableList}
          serviceItemPayableDetail={serviceItemPayableDetail}
        />
        <Fields.BenefitTypeCode />
        <Fields.PolicyNo invoiceId={invoiceId} />
        <Fields.ProductCode />
        <Fields.Remark />
        <Fields.SystemCalculationAmount serviceItemPayableDetail={serviceItemPayableDetail} />
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
              target: 'saveServicePayableAddItem',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveServicePayableAddItem',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { serviceItemPayableDetail } = props;

      return formUtils.mapObjectToFields(serviceItemPayableDetail);
    },
  })(InvoiceItemServiceItemPayableListItemAdd)
);
