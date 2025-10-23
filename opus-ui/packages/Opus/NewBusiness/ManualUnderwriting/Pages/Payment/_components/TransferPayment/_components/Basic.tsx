import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';

import { Fields, localConfig } from '../Sections/Basic';

const Transferpaymentfield = ({ form }: any) => {
  const editable = false;
  return (
    <Section
      form={form}
      editable={editable}
      localConfig={localConfig}
      section="TransferPayment-Field"
    >
      <Fields.Policyid />

      <Fields.Transferedamount />

      <Fields.Paidamount />

      <Fields.Policypayor />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange() {},
    mapPropsToFields(props: any) {
      const { datas } = props;
      return formUtils.mapObjectToFields(datas);
    },
  })(Transferpaymentfield)
);
