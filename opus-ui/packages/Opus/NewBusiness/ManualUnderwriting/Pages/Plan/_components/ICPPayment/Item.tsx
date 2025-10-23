import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from './Section';

const Withdrawal = ({ form, showOnly, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      showOnly={showOnly}
      editable={editable && !showOnly}
      register={!showOnly}
      section="DividendandICPInfo-Field"
      formId="DividendandICPInfo"
    >
      <Fields.IcpDividendPayType />
      <Fields.BankAcctName />

      <Fields.BankAccountNo />
      <Fields.BankCode />
      <Fields.BranchCode id={item?.id} />
      <Fields.BranchName />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id },
        bankType,
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveBankInfo',
          payload: {
            changedFields,
            id,
            type: bankType,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item, icpDividendPayType } = props;

      return formUtils.mapObjectToFields({ ...item, icpDividendPayType });
    },
  })(Withdrawal)
);
