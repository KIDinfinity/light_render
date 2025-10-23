import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { FormCard, formUtils } from 'basic/components/Form';
import Section, { PayableAddFields as Fields } from './Section';

const PayableAdd = ({ form, incidentId }: any) => {
  useEffect(() => {
    form.resetFields();
  }, [form]);
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <FormCard>
      <Section form={form} editable={editable} section="Procedure.Payable.Add" register={false}>
        <Fields.PolicyNoAdd incidentId={incidentId} />
      </Section>
    </FormCard>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, incidentId, procedureId, treatmentId }: any = props;
      dispatch({
        type: 'JPCLMOfClaimAssessment/addProcedurePayableItemAdd',
        payload: {
          incidentId,
          treatmentId,
          procedureId,
          changedValues,
        },
      });
      dispatch({
        type: 'JPCLMOfClaimAssessment/saveProcedurePayableItemAdd',
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
