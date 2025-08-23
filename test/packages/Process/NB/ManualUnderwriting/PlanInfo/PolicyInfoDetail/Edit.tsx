import React from 'react';
import { Form } from 'antd';
import { connect, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import getCoveragePremiumType from '../../_hooks/useGetCoveragePremiumType';
import useGetCfgPlanProductOptions from 'process/NB/ManualUnderwriting/_hooks/useGetCfgPlanProductOptions';
import useGetPolicyAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyAddressInfoList';
import getWithdrawalTerm from 'process/NB/ManualUnderwriting/_hooks/useGetWithdrawalTerm';
import useHandlePlanInfoConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandlePlanInfoConfigCallback';
import useSetPolicyAddress7DefaultValue from 'process/NB/ManualUnderwriting/_hooks/useSetPolicyAddress7DefaultValue';
import { NAMESPACE } from '../../activity.config';
import { Fields, localConfig } from './Section';
import styles from './index.less';
import { tenant, Region } from '@/components/Tenant';
import { v4 as uuid }  from 'uuid';

const PlanInfo = ({ form, id }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const policyInitialPremium = formUtils.queryValue(
    lodash.get(businessData, 'policyList[0].policyInitialPremium')
  );
  const annualPrem = formUtils.queryValue(lodash.get(businessData, 'policyList[0].annualPrem'));
  const annualizedPrem = formUtils.queryValue(
    lodash.get(businessData, 'policyList[0].annualizedPrem')
  );
  useGetCfgPlanProductOptions();
  useSetPolicyAddress7DefaultValue();
  const addressInfoList = useGetPolicyAddressInfoList({ id });
  const gateway = useHandlePlanInfoConfigCallback();

  const formId = uuid();

  return (
    <div className={styles.content}>
      <div className={styles.planInfo}>
        <Section
          section="PlanInfo-Field"
          form={form}
          localConfig={localConfig}
          gateway={gateway}
          formId={formId}
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
          <Fields.Effectivedate />
          <Fields.Isback />
          <Fields.Nonforfeitureoption />
          <Fields.Currencycode />
          <Fields.Paytype />
          <Fields.Renewalpaytype />
          <Fields.Basepremium />
          <Fields.MainPolicy />
          <Fields.SharingGroupNumber />
          <Fields.LAsharingGroupNumber />
        </Section>

        <Section
          section="PlanInfo-Field"
          form={form}
          localConfig={localConfig}
          gateway={gateway}
          formId={formId}
        >
          <Fields.PaymentOption />

          <Fields.Applywaitingperiod />

          <Fields.BeneficialOwnerFlag />

          <Fields.BeneficialOwnerHasUsaFlag />

          <Fields.BackDate />

          <Fields.Rsp />

          <Fields.Rspcharge />

          <Fields.Campaigncode />

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

          <Fields.Policyaddress7 id={id} />

          <Fields.Policyaddress6 id={id} addressInfoList={addressInfoList} />

          <Fields.Policyaddress5 id={id} addressInfoList={addressInfoList} />

          <Fields.Policyaddress4 id={id} addressInfoList={addressInfoList} />

          <Fields.Policyaddress3 id={id} addressInfoList={addressInfoList} />

          <Fields.Policyaddress2 id={id} />

          <Fields.Policyaddress1 id={id} />

          <Fields.Policyzipcode id={id} />

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

          <Fields.Refundpaytype />

          <Fields.DocumentDeliveryMode />

          <Fields.Crossreferencenumber />

          <Fields.Advancepaymentamount />

          <Fields.Advancepaymentduration />

          <Fields.Policytaxamount />
          <Fields.RiderNFO />
        </Section>
      </div>
      {tenant.region({
        [Region.ID]: () => (
          <div className={styles.premium}>
            <div className={styles.label}>
              <span>Premium Due</span>
              <span>Annualized Premium</span>
            </div>
            <div className={styles.value}>
              <span>
                {getFieldDisplayAmount(policyInitialPremium, 'nb.policyList.policyInitialPremium')}
              </span>
              <span>{getFieldDisplayAmount(annualizedPrem, 'nb.policyList.annualizedPrem')}</span>
            </div>
          </div>
        ),
        notMatch: () => (
          <div className={styles.premium}>
            <div className={styles.label}>
              <span>Premium Due</span>
              <span>Annual Premium</span>
            </div>
            <div className={styles.value}>
              <span>
                {getFieldDisplayAmount(policyInitialPremium, 'nb.policyList.policyInitialPremium')}
              </span>
              <span>{getFieldDisplayAmount(annualPrem, 'nb.policyList.annualPrem')}</span>
            </div>
          </div>
        ),
      })}
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => {
  return {
    validating: formCommonController.validating,
    policyList: lodash.get(modelnamepsace, 'businessData.policyList[0]', {}),
    purposeOfInsurance: lodash.get(modelnamepsace, 'businessData.purposeOfInsurance'),
    proposalDate: lodash.get(modelnamepsace, 'businessData.proposalDate'),
    applicationSignedDate: lodash.get(modelnamepsace, 'businessData.applicationSignedDate'),
    applicationPlaceOfSigning: lodash.get(modelnamepsace, 'businessData.applicationPlaceOfSigning'),
    fillerPipIndicator: lodash.get(modelnamepsace, 'businessData.fillerPipIndicator'),
    communicationPreference: lodash.get(modelnamepsace, 'businessData.communicationPreference'),
    customerSubmitDate: lodash.get(modelnamepsace, 'businessData.customerSubmitDate'),
    otherPurpose: lodash.get(modelnamepsace, 'businessData.otherPurpose'),
    caseType: lodash.get(modelnamepsace, 'businessData.caseType'),
    applyWaitingPeriod: lodash.get(modelnamepsace, 'businessData.applyWaitingPeriod'),
    eWithdrawalStatus: lodash.get(modelnamepsace, 'businessData.policyList[0].eWithdrawalStatus'),
    annualizedPrem: lodash.get(modelnamepsace, 'businessData.policyList[0].annualizedPrem'),
    facType: lodash.get(modelnamepsace, 'businessData.facType'),
    PolicyAddress7: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].countryCode',
      ''
    ),
    PolicyAddress6: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].addressLine6',
      ''
    ),
    PolicyAddress5: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].addressLine5',
      ''
    ),
    PolicyAddress4: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].addressLine4',
      ''
    ),
    PolicyAddress3: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].addressLine3',
      ''
    ),
    PolicyAddress2: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].addressLine2',
      ''
    ),
    PolicyAddress1: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].addressLine1',
      ''
    ),
    PolicyFullAddress: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].fullAddress',
      ''
    ),
    PolicyZipCode: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].policyAddressList[0].zipCode',
      ''
    ),

    fecRiskMsg: modelnamepsace.fecRiskMsg,
    firstPolicyFlag: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].uwProposalHealthFamilySharing.firstPolicyFlag',
      ''
    ),
    sharingGroupNumber: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].uwProposalHealthFamilySharing.sharingGroupNumber',
      ''
    ),
    laSharingGroupNumber: lodash.get(
      modelnamepsace,
      'businessData.policyList[0].uwProposalHealthFamilySharing.laSharingGroupNumber',
      ''
    ),
    eDocument: lodash.get(modelnamepsace, 'businessData.eDocument'),
    icpDividendPayType: lodash.get(modelnamepsace, 'businessData.policyList[0].icpDividendPayType'),
  };
})(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setPlanFieldData',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setPlanFieldData',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const {
        policyList,
        purposeOfInsurance,
        annualizedPrem,
        proposalDate,
        applicationSignedDate,
        applicationPlaceOfSigning,
        fillerPipIndicator,
        communicationPreference,
        customerSubmitDate,
        otherPurpose,
        caseType,
        eWithdrawalStatus,
        PolicyAddress7,
        PolicyAddress6,
        PolicyAddress5,
        PolicyAddress4,
        PolicyAddress3,
        PolicyAddress2,
        PolicyAddress1,
        fullAddress,
        PolicyZipCode,
        applyWaitingPeriod,
        basePremium,
        fecRiskMsg,
        facType,
        PolicyFullAddress,
        firstPolicyFlag,
        sharingGroupNumber,
        laSharingGroupNumber,
        eDocument,
        icpDividendPayType,
      } = props;

      const premiumType = getCoveragePremiumType({ detail: policyList });
      const withdrawalTerm = getWithdrawalTerm({ policyList });
      return formUtils.mapObjectToFields({
        ...policyList,

        purposeOfInsurance,
        proposalDate,
        applicationSignedDate,
        applicationPlaceOfSigning,
        fillerPipIndicator,
        annualizedPrem,
        communicationPreference,
        customerSubmitDate,
        eWithdrawalStatus,
        otherPurpose,
        premiumType,
        caseType,
        PolicyAddress7,
        PolicyAddress6,
        PolicyAddress5,
        PolicyAddress4,
        PolicyAddress3,
        PolicyAddress2,
        PolicyAddress1,
        fullAddress,
        PolicyZipCode,
        applyWaitingPeriod,
        basePremium,
        withdrawalTerm,
        fecRiskMsg,
        facType,
        PolicyFullAddress,
        firstPolicyFlag,
        sharingGroupNumber,
        laSharingGroupNumber,
        eDocument,
        icpDividendPayType,
      });
    },
  })(PlanInfo)
);
