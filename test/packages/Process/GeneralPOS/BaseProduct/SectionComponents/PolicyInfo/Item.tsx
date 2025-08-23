import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PolicyInfo">
      <Fields.RiskStatus />
      <Fields.PremiumStatus />
      <Fields.PolicyName />
      <Fields.PolicyEffectiveDate />
      <Fields.LastPaymentDate />
      <Fields.PaidToDate />
      <Fields.BillingFrequency />
      <Fields.SalesChannel />
      <Fields.PolicyReinstatmentDate />
      <Fields.CoverageTerminateDate />
      <Fields.PolicyCurrency />
      <Fields.IssueEffectiveDate />
      <Fields.PaymentMethod />
      <Fields.TotalModePremium />
      <Fields.PolicyDispatchAddr />
      <Fields.BillToDate />
      <Fields.PreferredMailingAddr />
      <Fields.PreferredMailingAddrDtl />
      <Fields.TrustPolicy />
      <Fields.PremiumPaymentMethod />
      <Fields.HighlightPolicyNote />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  mainPolicyId: modelnamepsace.processData?.mainPolicyId,
  sourceSystem: modelnamepsace.processData?.sourceSystem,
  policyInfo: modelnamepsace.processData?.policyInfo,
}))(
  Form.create({
    onFieldsChange() {},
    mapPropsToFields(props: any) {
      const { mainPolicyId, sourceSystem, policyInfo } = props;
      const { policyInfoList, policyAddrList } = policyInfo || {};
      const info =
        lodash.find(
          policyInfoList,
          (item: any) => item.policyId === mainPolicyId && item.sourceSystem === sourceSystem
        ) || {};

      const policyAddress = policyAddrList?.find((item) => item?.policyId === mainPolicyId) || {};

      const policyDispatchAddr = {
        addressLine1: policyAddress?.addressLine1,
        addressLine2: policyAddress?.addressLine2,
        addressLine3: policyAddress?.addressLine3,
        addressLine4: policyAddress?.addressLine4,
        addressLine5: policyAddress?.addressLine5,
        zipCode: policyAddress?.zipCode,
        countryCode: formatMessageApi({
          Dropdown_CFG_Country: policyAddress?.countryCode,
        }),
      };
      const clientContact =
        policyInfo?.policyDespatchAddressList?.find((item) => item?.policyId === mainPolicyId) ||
        {};

      return formUtils.mapObjectToFields({
        ...info,
        policyDispatchAddr: lodash.compact(Object.values(policyDispatchAddr)).join(' '),
        preferredMailingAddr: clientContact?.preferredMailingAddress,
        preferredMailingAddrDtl:
          clientContact?.preferredMailingAddress === 'E'
            ? clientContact?.emailAddress
            : clientContact?.wholeAddress,
        trustPolicy: lodash.isEmpty(info)
          ? ''
          : info?.trusteeIndicator === 'Y'
            ? info?.trusteeIndicator
            : 'N',
        highlight: lodash.isEmpty(info) ? '' : info?.highlightPolicyNote,
      });
    },
  })(Item)
);
