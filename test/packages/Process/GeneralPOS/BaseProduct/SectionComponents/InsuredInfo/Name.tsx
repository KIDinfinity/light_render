import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <Section form={form} editable={editable} section="CustomerInfo">
      <Fields.Name />
    </Section>
  );
};

export default Form.create({
  mapPropsToFields(props: any) {
    const { name, clientId, roles } = props;

    return formUtils.mapObjectToFields({ name, clientId, roles });
  },
})(Item);
