import lodash from 'lodash';
import { UninsuredPart } from 'claim/pages/Enum';

export const getPopUpPolicyInfo = (item: any) => {
  const {
    policyId,
    popUpPolicyContract,
    premiumPaymentPeriod,
    uninsuredInfoList,
  } = lodash.pick(item, [
    'popUpPolicyContract',
    'policyId',
    'premiumPaymentPeriod',
    'uninsuredInfoList',
  ]);

  let [uninsuredPartCN1, uninsuredPartCN2, uninsuredPartCN3, uninsuredPartCN4] = ['', '', '', ''];
  lodash.map(uninsuredInfoList, (uninsuredInfoListItem) => {
    const uninsuredPartValue = `${uninsuredInfoListItem?.exclusionType}  ${uninsuredInfoListItem?.exclusionPeriod}`;
    switch (uninsuredInfoListItem?.exclusionCategory) {
      case UninsuredPart.CN1:
        uninsuredPartCN1 = uninsuredPartValue;
        break;
      case UninsuredPart.CN2:
        uninsuredPartCN2 = uninsuredPartValue;
        break;
      case UninsuredPart.CN3:
        uninsuredPartCN3 = uninsuredPartValue;
        break;
      case UninsuredPart.CN4:
        uninsuredPartCN4 = uninsuredPartValue;
        break;
      default:
        break;
    }
  });

  const {
    announcementDate,
    specialDisability,
    specialContractType,
    reductionOfInsuranceBenefits,
    premiumPaidToMonth,
    lumpSumPremiumAmount,
    detailsOfTheExamination,
    nextAppropriationMonth,
  } = lodash.pick(popUpPolicyContract, [
    'announcementDate',
    'specialDisability',
    'specialContractType',
    'reductionOfInsuranceBenefits',
    'premiumPaidToMonth',
    'lumpSumPremiumAmount',
    'nextAppropriationMonth',
    'detailsOfTheExamination',
  ]);
  const policyInfo = {
    uninsuredPartCN2,
    uninsuredPartCN3,
    uninsuredPartCN4,
    uninsuredPartCN1,
    policyId,
    reductionOfInsuranceBenefits,
    premiumPaidToMonth,
    announcementDate,
    specialDisability,
    specialContractType,
    nextAppropriationMonth,
    premiumPaymentPeriod,
    lumpSumPremiumAmount,
    detailsOfTheExamination,
  };
  return policyInfo;
};

export default { getPopUpPolicyInfo };
