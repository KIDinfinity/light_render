import React from 'react';
import { useSelector, connect } from 'dva';

import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';

import { relationshipWithInsuredForHK } from 'claim/enum';

import { NAMESPACE } from '../../activity.config';

import Section, { Fields } from '../Secitons/Basic';

const Basic = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const ispayeeSelf =
    form.getFieldValue('payeeType') === relationshipWithInsuredForHK.self ||
    form.getFieldValue('payeeType') === relationshipWithInsuredForHK.policyOwner;

  return (
    <Section
      form={form}
      editable={editable && !ispayeeSelf}
      section="payeeBasic"
      formId="payeeBasic"
    >
      <Fields.ClientId />

      <Fields.Email />
      <Fields.FirstName />
      <Fields.Gender />
      <Fields.IdentityNo />
      <Fields.IdentityType />
      <Fields.Corporation />
      <Fields.CompanyName />
      <Fields.MiddleName />
      <Fields.PayeeType />
      <Fields.PhoneNo />
      <Fields.Surname />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        countryCode,
        item: { id: payeeId },
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePayee',
          payload: {
            changedFields,
            countryCode,
            payeeId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Basic)
);
