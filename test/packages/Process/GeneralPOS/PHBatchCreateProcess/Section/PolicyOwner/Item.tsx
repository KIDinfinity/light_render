import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PolicyOwner">
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
      const { mainPolicyId, policyInfo } = props;

      const clientId = lodash.find(
        policyInfo?.policyOwnerList,
        (item) => item.policyId === mainPolicyId
      )?.clientId;

      const info =
        lodash.find(policyInfo?.clientInfoList, (item) => item.clientId === clientId) || {};
      const contactInfo =
        lodash.find(policyInfo?.clientContactList, (item) => item.clientId === clientId) || {};
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
