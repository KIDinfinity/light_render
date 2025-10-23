import React, { useEffect } from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { connect, useSelector } from 'dva';
import Section, { PayableAddFields as Fields } from './Section';

const PayableAdd = ({ form, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <CardOfClaim>
      <Section
        form={form}
        editable={editable}
        section="OtherProcedure.Payable.Add"
        register={false}
      >
        <Fields.PolicyNoAdd incidentId={incidentId} />
      </Section>
    </CardOfClaim>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, incidentId, otherProcedureId, treatmentId }: any = props;
      dispatch({
        type: 'JPCLMOfClaimAssessment/addOtherProcedurePayableItemAdd',
        payload: {
          otherProcedureId,
          incidentId,
          treatmentId,
          changedValues,
        },
      });
      dispatch({
        type: 'JPCLMOfClaimAssessment/saveOtherProcedurePayableItemAdd',
        payload: {
          changedFields: {
            policyNo: {
              dirty: false,
              name: 'policyNo',
              value: changedValues?.policyNo,
            },
          },
        },
      });

    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(PayableAdd)
);
