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
      <Fields.AdvancedPayoutAmount />
      <Fields.OutstandingPayoutAmount />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id },
        validating,
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/savePaymentTrackDetailList`,
              target: 'savePaymentTrackDetailList',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'savePaymentTrackDetailList',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item, idx } = props;

      return formUtils.mapObjectToFields({ ...item, idx });
    },
  })(Basic)
);
