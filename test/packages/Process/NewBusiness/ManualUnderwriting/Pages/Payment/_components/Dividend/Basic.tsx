import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from './Section';

const Withdrawal = ({ form, showOnly }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      showOnly={showOnly}
      editable={editable && !showOnly}
      section="DividendandICPInfo-Field"
      formId="DividendandICPInfo-Field"
    >
      <Fields.IcpDividendPayType />
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
              icpDividendPayType: formUtils.queryValue(changedFields.icpDividendPayType),
            },
            type: 'change',
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { icpDividendPayType } = props;

      return formUtils.mapObjectToFields({ icpDividendPayType });
    },
  })(Withdrawal)
);
