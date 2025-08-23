import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { FormCard, formUtils } from 'basic/components/Form';
import Section, { AddFields as Fields } from './Section';

const Add = ({ form, invoiceId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <FormCard style={{ paddingTop: 16 }}>
      <Section form={form} editable={editable} section="ServiceItem.Payable.AddField">
        <Fields.PolicyNoAdd invoiceId={invoiceId} />
      </Section>
    </FormCard>
  );
};

export default connect()(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo, incidentId, treatmentId, serviceItemId, invoiceId }: any = props;
      dispatch({
        type: 'JPCLMOfClaimAssessment/addServicePayableItem',
        payload: {
          serviceItemId,
          incidentId,
          treatmentId,
          invoiceId,
          claimNo,
          changedValues,
        },
      });
      dispatch({
        type: 'JPCLMOfClaimAssessment/saveServicePayableAddItem',
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
  })(Add)
);
