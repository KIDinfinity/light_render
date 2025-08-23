import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import { Form } from 'antd';
import { addTherapiesItem } from 'process/THCLM/ManualAssessment/_models/functions';
import Section, { Fields } from './Section';

const Add = ({ form, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    editable && (
      <FormBorderCard marginBottom>
        <Section form={form} editable={editable} section="Add" register={false}>
          <Fields.TherapiesTypeAdd treatmentId={treatmentId} isAdd />
        </Section>
      </FormBorderCard>
    )
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, treatmentId, claimNo } = props;
      addTherapiesItem({ dispatch, claimNo, changedValues, treatmentId });
    },
  })(Add)
);
