import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Main = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="TherapeuticMonthList">
      <Fields.TherapyType />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    mapPropsToFields(props) {
      const { procedureType } = props;

      return formUtils.mapObjectToFields({ procedureType });
    },
  })(Main)
);
