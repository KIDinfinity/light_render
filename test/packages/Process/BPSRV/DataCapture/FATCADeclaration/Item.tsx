import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div>
      <Section
        form={form}
        editable={editable}
        section="FATCADeclaration"
      >
        <Fields.Country />
        <Fields.TINNo />
        <Fields.HasTinNumber />
        <Fields.ReasonfornoTinnumber />
        <Fields.Remark />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create({
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(
        {
          ...item,
          reasonforNoTIN: `${item?.reasonCode || ''} ${item?.reasonDesc || ''}`
        }
      );
    },
  })(Item)
);
