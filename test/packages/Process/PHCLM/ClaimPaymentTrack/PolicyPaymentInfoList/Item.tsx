import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Sections';

const Basic = ({ form }: any) => {
  return (
    <Section form={form} editable={false} section="policyPaymentInfo">
      <Fields.PolicyNo />
      <Fields.PolicyType />
      <Fields.PaymentAmount />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { item, idx } = props;

      return formUtils.mapObjectToFields({ ...item, idx });
    },
  })(Basic)
);
