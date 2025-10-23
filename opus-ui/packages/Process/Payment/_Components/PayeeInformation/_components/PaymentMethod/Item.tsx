import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';

import Section, { Fields } from '../../Secitons/Bank';

const seachCustom: any = new SeachCustom();

const Item = ({ form, disabled, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      editable={editable && !disabled}
      register={!disabled}
      section="bankAccount"
      formId={`bankAccount${item.id}`}
    >
      <Fields.AccountHolder />
      <Fields.BankCode seachCustom={seachCustom} />
      <Fields.BranchCode seachCustom={seachCustom} />
      <Fields.AccountType />
      <Fields.BankAccountNo />
      <Fields.ActivationDateFrom />
      <Fields.ActivationDateTo />
      <Fields.Currency />
      <Fields.SecurityCode />
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
        NAMESPACE,
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'paymentPayeeItemBankAccountUpdate',
              payload: {
                changedFields,
                id,
                seachCustom,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'paymentPayeeItemBankAccountUpdate',
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
