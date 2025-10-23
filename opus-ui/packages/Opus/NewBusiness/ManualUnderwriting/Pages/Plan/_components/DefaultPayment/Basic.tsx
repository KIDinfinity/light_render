import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from './Section';

const DefaultPayment = ({ form, showOnly }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      showOnly={showOnly}
      editable={editable && !showOnly}
      section="DefaultPayment-Field"
      formId="DefaultPaymentBasic"
    >
      <Fields.DefaultPayType />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      return false;
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePlanInfoData',
          payload: {
            changedFields: {
              defaultPayType: changedFields.defaultPayType,
            },
            type: 'change',
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { defaultPayType } = props;

      return formUtils.mapObjectToFields({ defaultPayType });
    },
  })(DefaultPayment)
);
