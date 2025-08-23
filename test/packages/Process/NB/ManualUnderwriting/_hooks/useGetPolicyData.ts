import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import useGetCoveragePremiumType from './useGetCoveragePremiumType';
import useGetWithdrawalTerm from './useGetWithdrawalTerm';
import useGetBasePremiumValue from 'process/NB/ManualUnderwriting/_hooks/useGetBasePremiumValue';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import { formUtils } from 'basic/components/Form';
import useGetCampaignName from './useGetCampaignName';
export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  let policyDetailList = lodash.get(businessData, 'policyList[0]', []);
  const basePremium = useGetBasePremiumValue();
  const fecRiskMsg = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.fecRiskMsg,
    shallowEqual
  );

  const advancePaymentAmount = lodash.get(businessData, 'policyList[0].advancePaymentAmount', 0);
  const advancePaymentTaxAmount = formUtils.queryValue(
    lodash.get(businessData, 'policyList[0].advancePaymentTaxAmount', 0)
  );
  const advancePaymentDuration =
    advancePaymentAmount +
    formUtils.queryValue(lodash.get(businessData, 'policyList[0].policyInitialPremium', 0));
  const policyTaxAmount =
    formUtils.queryValue(lodash.get(businessData, 'policyList[0].policyTaxAmount', 0)) +
    advancePaymentTaxAmount;
  const laSharingGroupNumber = formUtils.queryValue(
    lodash.get(
      businessData,
      'policyList[0].uwProposalHealthFamilySharing.laSharingGroupNumber',
      null
    )
  );
  const campaignCode = useGetCampaignName(
    formUtils.queryValue(lodash.get(businessData, 'policyList[0].campaignCode', 0))
  );

  policyDetailList = {
    ...policyDetailList,
    proposalDate: lodash.get(businessData, 'proposalDate'),
    purposeOfInsurance: lodash.get(businessData, 'purposeOfInsurance'),
    applicationSignedDate: lodash.get(businessData, 'applicationSignedDate'),
    applicationPlaceOfSigning: lodash.get(businessData, 'applicationPlaceOfSigning'),
    fillerPipIndicator: lodash.get(businessData, 'fillerPipIndicator'),
    communicationPreference: lodash.get(businessData, 'communicationPreference'),
    customerSubmitDate: lodash.get(businessData, 'customerSubmitDate'),
    otherPurpose: lodash.get(businessData, 'otherPurpose'),
    caseType: lodash.get(businessData, 'caseType'),
    premiumType: useGetCoveragePremiumType({ detail: policyDetailList }),
    PolicyFullAddress: lodash.get(
      businessData,
      'policyList[0].policyAddressList[0].fullAddress',
      ''
    ),
    PolicyZipCode: lodash.get(businessData, 'policyList[0].policyAddressList[0].zipCode', ''),
    applyWaitingPeriod: lodash.get(businessData, 'applyWaitingPeriod'),
    basePremium: getFieldDisplayAmount(basePremium, 'nb.policyList.coverageList.annualPrem') || '',
    withdrawalTerm: useGetWithdrawalTerm({ policyList: policyDetailList }),
    fecRiskMsg,
    facType: lodash.get(businessData, 'facType', ''),
    firstPolicyFlag: lodash.get(
      businessData,
      'policyList[0].uwProposalHealthFamilySharing.firstPolicyFlag',
      ''
    ),
    sharingGroupNumber: lodash.get(
      businessData,
      'policyList[0].uwProposalHealthFamilySharing.sharingGroupNumber',
      ''
    ),
    eDocument: lodash.get(businessData, 'eDocument'),
    advancePaymentDuration,
    policyTaxAmount,
    laSharingGroupNumber,
    campaignCode,
    isContinuePremiumPay: lodash.get(businessData, 'isContinuePremiumPay'),
    riderNFO: lodash.get(businessData, 'policyList[0].riderNfo', ''),
  };
  return policyDetailList;
};
