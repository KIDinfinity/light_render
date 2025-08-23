import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const TherapeuticDate = ({
  form,
  otherProcedureId,
  therapeuticMonth,
  datepickerOpen,
  setDatepickerOpen,
}: any) => {
  return (
    <Section form={form} section="TherapeuticMonthList">
      <Fields.TherapeuticDate
        otherProcedureId={otherProcedureId}
        therapeuticMonth={therapeuticMonth}
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
  })(TherapeuticDate)
);
