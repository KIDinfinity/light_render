import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const OutpatientDate = ({ form, treatmentId, groupId, datepickerOpen, setDatepickerOpen }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} section="OutpatientDateGroup" editable={editable}>
      <Fields.OutpatientDate
        treatmentId={treatmentId}
        groupId={groupId}
        datepickerOpen={datepickerOpen}
        setDatepickerOpen={setDatepickerOpen}
      />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(OutpatientDate)
);
