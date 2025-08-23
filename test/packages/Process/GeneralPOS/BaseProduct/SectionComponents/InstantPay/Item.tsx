import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';

const InstantPay = ({ form }: any) => {
  return (
    <Section form={form} section="InstantPay">
      <Fields.InstantPayFlag />
      <Fields.PaymentRefNo />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  instantPay:
    modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList?.[0],
}))(
  Form.create<any>({
    mapPropsToFields(props) {
      const { instantPay }: any = props;
      return formUtils.mapObjectToFields({
        ...instantPay,
        instantPayFlag: lodash.upperCase(instantPay?.instantPayFlag) === 'Y' ? 1 : 0,
      });
    },
  })(InstantPay)
);
