import React from 'react';

import { Form } from 'antd';
import { useSelector, connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetShowDividendICPInfo from '../_hooks/useGetShowDividendICPInfo';
import useJudgeShowAnnuityPayment from '../_hooks/useJudgeShowAnnuityPayment';
import Section, { Fields } from '../Sections/Basic';
import ICPPayment from './ICPPayment/index';
import AnnuityPayment from './AnnuityPayment/index';
import DefaultPayment from './DefaultPayment/index';
import lodash from 'lodash';
import BooleanEnum from 'basic/enum/BooleanEnum';
import isShowDefaultPayment from '../_utils/isShowDefaultPayment';

interface IParams {
  form: any;
  showOnly?: boolean;
  planInfoData: any;
}

const Basic = ({ form, showOnly = false, planInfoData }: IParams) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const showDividend = useGetShowDividendICPInfo();
  const showAnnuityPayment = useJudgeShowAnnuityPayment();
  const showDefaultPayment = isShowDefaultPayment();

  return (
    <>
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
        <Fields.FixedRcdDate />
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
        <Fields.TaxDeductionConsent />
        <Fields.ZipCode />
      </Section>
      {showDividend ? <ICPPayment planInfoData={planInfoData} showOnly={showOnly} /> : null}
      {showAnnuityPayment ? (
        <AnnuityPayment planInfoData={planInfoData} showOnly={showOnly} />
      ) : null}
      {showDefaultPayment ? (
        <DefaultPayment planInfoData={planInfoData} showOnly={showOnly} />
      ) : null}
    </>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;

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
      const { privateFundFlag, rebalancingType } = data;
      return formUtils.mapObjectToFields(
        {
          ...data,
          advancePaymentDuration:
            formUtils.queryValue(data.advancePaymentAmount) +
              formUtils.queryValue(data.policyInitialPremium) || 0,
          rebalancingType,
          fixedRcdDateFlag: data.fixedRcdDateFlag ?? BooleanEnum.No, // Default to No if not provided
        },
        {
          rebalancingType: (value: string | null | undefined) => {
            const privateFundFlagValue = formUtils.queryValue(privateFundFlag);
            return !lodash.isEmpty(privateFundFlagValue) && value === '' ? 'N' : value;
          },
        }
      );
    },
  })(Basic)
);
