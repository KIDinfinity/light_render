import React, { useEffect } from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils, FormCard } from 'basic/components/Form';
import Section, { AddField } from './Section';

const Add = ({ form, treatmentId, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <FormCard>
      <Section form={form} section="OutpatientDateGroup.Add" editable={editable}>
        <AddField.OutpatientDateAdd treatmentId={treatmentId} incidentId={incidentId} />
      </Section>
    </FormCard>
  );
};

export default connect()(
  Form.create<any>({
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
