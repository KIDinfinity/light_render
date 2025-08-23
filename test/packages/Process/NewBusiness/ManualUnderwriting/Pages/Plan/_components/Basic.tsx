import React from 'react';

import { Form } from 'antd';
import { useSelector, connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from '../Sections/Basic';

interface IParams {
  form: any;
  showOnly?: boolean;
}

const Basic = ({ form, showOnly = false }: IParams) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      showOnly={showOnly}
      register={!showOnly}
      editable={editable && !showOnly}
      section="PlanInfo-Field"
      formId="PlanInfo-Field"
    >
      <Fields.CaseType />
      <Fields.Policyplantype />
      <Fields.Policyplanname />
      <Fields.Quotationrefno />
      <Fields.Proposaldate />
      <Fields.Applicationsigneddate />
      <Fields.Applicationplaceofsigning />
      <Fields.CustomerSubmitDate />
      <Fields.Policypaymode />
      <Fields.Annualizedprem />
      <Fields.Policyinitialpremium />
      <Fields.Annualprem />
      <Fields.Effectivedate />
      <Fields.Isback />
      <Fields.Nonforfeitureoption />
      <Fields.Currencycode />
      <Fields.Basepremium />
      <Fields.MainPolicy />
      <Fields.SharingGroupNumber />
      <Fields.Applywaitingperiod />
      <Fields.BeneficialOwnerFlag />
      <Fields.BeneficialOwnerHasUsaFlag />
      <Fields.BackDate />
      <Fields.Rsp />
      <Fields.Rspcharge />
      <Fields.Campaigncode />
      <Fields.JointFieldAgentId />
      <Fields.Purposeofinsurance />
      <Fields.Sbcaca />
      <Fields.SourceFundOtherReason />
      <Fields.Sourceofpremium />
      <Fields.Policydeliverymode />
      <Fields.Otherpurpose />
      <Fields.Sourcefund />
      <Fields.Remoteselling />
      <Fields.Rpqscore />
      <Fields.PremiumType />
      <Fields.Sourceofpremiumcountry />
      <Fields.InvestmentOption />
      <Fields.Communicationpreference />
      <Fields.SurvivalBenefitOption />
      <Fields.GIOCampaignCode />
      <Fields.AffiliateCampaignCode />
      <Fields.PolicyFullAddress />
      <Fields.Gsindicator />
      <Fields.Ewithdrawalstatus />
      <Fields.Specialtaggingindicator />
      <Fields.Diabetesdurationyears />
      <Fields.CustomerFactFind />
      <Fields.WithdrawalTerm />
      <Fields.Fecriskmsg />
      <Fields.FacType />
      <Fields.Rebalancingtype />
      <Fields.Privatefundflag />
      <Fields.RpqExecuteDate />
      <Fields.RpqRiskLevel />
      <Fields.DocumentDeliveryMode />
      <Fields.NewStlSya />
      <Fields.Crossreferencenumber />
      <Fields.Refundpaytype />
      <Fields.Advancepaymentamount />
      <Fields.Advancepaymentduration />
      <Fields.Policytaxamount />
      <Fields.Policyzipcode />
      <Fields.PaymentContinuation />
      <Fields.RiderNFO />
      <Fields.TpaPriority />
      <Fields.PreferredPolicyPrintService />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      //后端处理不到undefined
      if (
        changedFields?.purposeOfInsurance &&
        changedFields?.purposeOfInsurance?.value === undefined
      ) {
        changedFields.purposeOfInsurance.value = '';
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePlanInfoData',
          payload: {
            changedFields,
            type: 'change',
            id: data?.id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields({
        ...data,
        advancePaymentDuration:
          (formUtils.queryValue(data.advancePaymentAmount) || 0) +
          (formUtils.queryValue(data.policyInitialPremium) || 0),
      });
    },
  })(Basic)
);
