import React from 'react';
import { Form } from 'antd';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="AgentInfo">
      <Fields.AgentBranch />
      <Fields.Email />
      <Fields.AgentExpiryDate />
      <Fields.AgentName />
      <Fields.AgentPhone />
      <Fields.AgentType />
    </Section>
  );
};

export default Form.create({
  onFieldsChange() {},
  mapPropsToFields(props: any) {
    const { info } = props;

    return formUtils.mapObjectToFields(info);
  },
})(Item);
