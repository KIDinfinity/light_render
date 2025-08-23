import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const Item = ({ form, policyInfoList, mainPolicyId, sourceSystem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const { insuredClientId, ownerClientId } =
    lodash.find(
      policyInfoList,
      (item: any) => item.policyId === mainPolicyId && item.sourceSystem === sourceSystem
    ) || {};

  return (
    <Section form={form} editable={editable} section="PolicyInfo">
      <Fields.AgentFirstName />
      <Fields.BillingFrequency />
      <Fields.CoverageTerminateDate />
      <Fields.InsuredFullName clientId={insuredClientId} />
      <Fields.IssueEffectiveDate />
      <Fields.LastPaidDate />
      <Fields.OwnerFullName clientId={ownerClientId} />
      <Fields.PaidToDate />
      <Fields.PaymentMethod />
      <Fields.PolicyName />
      <Fields.PremiumStatus />
      <Fields.RiskStatus />
      <Fields.SalesChannel />
      <Fields.TotalModePremium />
    </Section>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  mainPolicyId: modelnamepsace.processData?.mainPolicyId,
  sourceSystem: modelnamepsace.processData?.sourceSystem,
  policyInfoList: modelnamepsace.processData?.policyInfo?.applyToPolicyInfoList,
}))(
  Form.create({
    onFieldsChange() {},
    mapPropsToFields(props: any) {
      const { mainPolicyId, sourceSystem, policyInfoList } = props;

      return formUtils.mapObjectToFields(
        lodash.find(
          policyInfoList,
          (item: any) => item.policyId === mainPolicyId && item.sourceSystem === sourceSystem
        ) || {}
      );
    },
  })(Item)
);
