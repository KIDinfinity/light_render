import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Sections';

const Basic = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} editable={editable} section="paymentTrackDetail">
      <Fields.PayeeType />
      <Fields.PaymentMethod />
      <Fields.PaymentAmount />
      <Fields.CheckNo />
      <Fields.CheckDate />
      <Fields.PaidOut />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id },
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePaymentTrackDetailList',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item, idx } = props;

      return formUtils.mapObjectToFields({ ...item, idx });
    },
  })(Basic)
);
