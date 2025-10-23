import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';

import { NAMESPACE } from '../../../activity.config';

import Section, { Fields } from '../../Secitons/Bank';

const seachCustom: any = new SeachCustom();

const Item = (props) => {
  const { form } = props;
  return (
    <Section
      form={form}
      editable={false}
      register={false}
      section="bankAccount"
      labelType="inline"
      formId="bankAccount"
    >
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
        payeeId,
        item: { id },
        validating,
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'updateBankAccount',
              payload: {
                changedFields,
                payeeId: payeeId,
                id,
                seachCustom,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'updateBankAccount',
            payload: {
              changedFields,
              payeeId,
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
