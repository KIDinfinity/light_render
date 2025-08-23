import React from 'react';
import { useSelector, connect } from 'dva';

import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';

import Section, { Fields } from './PayoutCurrencySection';

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id },
        validating,
        NAMESPACE,
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'paymentPayeeItemUpdate',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveEntry`,
            target: 'paymentSavePayeeInfo',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(({ form }: any) => {
    const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
    return (
      <Section form={form} editable={editable} section="payoutCurrency">
        <Fields.PayoutCurrency />
      </Section>
    );
  })
);
