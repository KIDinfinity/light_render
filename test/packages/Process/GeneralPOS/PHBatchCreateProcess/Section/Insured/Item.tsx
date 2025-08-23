import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="InsuredInfo">
      <Fields.Title />
      <Fields.FirstName />
      <Fields.MiddleName />
      <Fields.Surname />
      <Fields.ExtName />
      <Fields.Gender />
      <Fields.DateOfBirth />
      <Fields.PlaceOfBirth />
      <Fields.Nationality />
    </Section>
  );
};

export default connect(({ claimEditable, PHBatchCreateProcessController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  mainPolicyId: PHBatchCreateProcessController?.processData?.mainPolicyId,
  policyInfo: PHBatchCreateProcessController?.processData?.policyInfo,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { policyInfo } = props;
      const { mainInsuredClientId, clientInfoList, clientContactList } = policyInfo || {};

      const info =
        lodash.find(clientInfoList, (item) => item.clientId === mainInsuredClientId) || {};
      const contactInfo =
        lodash.find(clientContactList, (item) => item.clientId === mainInsuredClientId) || {};

      return formUtils.mapObjectToFields(
        {
          ...info,
          ...contactInfo,
        },
        {}
      );
    },
  })(Item)
);
