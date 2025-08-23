import React, { useEffect } from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { connect, useSelector } from 'dva';
import Section, { AddFields as Fields } from '../Section';

const AddField = ({ form, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <CardOfClaim style={{ paddingTop: 16 }}>
      <Section form={form} editable={editable} section="Treatment.Payable.AddField">
        <Fields.PolicyNoAdd incidentId={incidentId} />
      </Section>
    </CardOfClaim>
  );
};

export default connect()(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, incidentId, treatmentId }: any = props;

      dispatch({
        type: 'JPCLMOfClaimAssessment/addTreatmentPayableItem',
        payload: {
          incidentId,
          treatmentId,
        },
      });

      dispatch({
        type: 'JPCLMOfClaimAssessment/saveTreatmentPayableAddItem',
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
  })(AddField)
);
