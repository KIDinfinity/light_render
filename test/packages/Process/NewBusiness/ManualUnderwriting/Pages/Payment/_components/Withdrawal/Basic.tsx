import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from './Section';

interface IParams {
  form: any;
  showOnly: boolean;
}

const Basic = ({ form, showOnly }: IParams) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      showOnly={showOnly}
      register={!showOnly}
      editable={editable && !showOnly}
      section="WithdrawalPaymentInfo-Table"
      formId="WithdrawalPaymentInfo-Table"
    >
      <Fields.Refundpaytype />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePlanInfoData',
          payload: {
            changedFields: {
              refundPayType: formUtils.queryValue(changedFields.refundPayType),
            },
            type: 'change',
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { refundPayType } = props;

      return formUtils.mapObjectToFields({ refundPayType });
    },
  })(Basic)
);
