import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { getPayeeDefaultData } from 'claim/pages/utils/getPayeeDefaultData';
import Section, { Fields } from './Section';

const ContactInfo = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <Section form={form} formId="payee-ContactInfo" editable={editable}>
      <Fields.ContactType />
      <Fields.PhoneNo />
      <Fields.SMS />
      <Fields.Email />
      <Fields.PostCode />
      <Fields.Address />
      <Fields.Address2 />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'opusClaimDataCapture/saveEntry',
              target: 'payeeUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'opusClaimDataCapture/saveFormData',
            target: 'payeeUpdate',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { payeeItem } = props;
      const mapPayee = getPayeeDefaultData(payeeItem);

      return formUtils.mapObjectToFields(mapPayee);
    },
  })(ContactInfo)
);
