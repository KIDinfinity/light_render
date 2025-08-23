import React from 'react';
import { Form } from 'antd';
import { Fields } from './Section';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { formUtils } from 'basic/components/Form';
import { localConfig } from './Section/index';

const FormItem = ({ form, transactionId }: any) => {
  return (
    <Section
      form={form}
      section="Reinstatement-Popup"
      formId="Reinstatement-Popup"
      localConfig={localConfig}
    >
      <Fields.Name transactionId={transactionId} />
      <Fields.ProductCode transactionId={transactionId} />
    </Section>
  );
};

const ProductSelect = Form.create<any>({
  onFieldsChange(props: any, changedFields: any) {
    if (formUtils.shouldUpdateState(changedFields)) {
      const { setAddData } = props;
      setAddData((e) => ({ ...e, ...changedFields }));
    }
  },
  mapPropsToFields(props) {
    const { addData } = props;
    return formUtils.mapObjectToFields(addData);
  },
})(FormItem);

ProductSelect.displayName = 'productSelect';

export default ProductSelect;
