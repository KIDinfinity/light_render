import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';

import Section, { Fields } from '../../Secitons/Bank';

const seachCustom: any = new SeachCustom();

const Item = ({ form }: any) => {
  return (
    <Section form={form} register={false} editable={false} section="bankAccount" labelType="inline">
      <Fields.AccountHolder />
      <Fields.BankCode seachCustom={seachCustom} />
      <Fields.BranchCode seachCustom={seachCustom} />
      <Fields.BankAccountNo />
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
              type: `paymentAllocation/saveEntry`,
              target: 'PayeeItemBankAccountUpdate',
              payload: {
                changedFields,
                id,
                seachCustom,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `paymentAllocation/saveFormData`,
            target: 'PayeeItemBankAccountUpdate',
            payload: {
              changedFields,
              id,
              seachCustom,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Item)
);
