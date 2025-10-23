export interface productConfig {
  regionCode?: string;
  productCode: string;
  productName?: string;
  mortalityClass?: string;
  basicRiderCode?: string;
  wpPbCode?: string;
  saEditInd?: string;
  saFollowCode?: string;
  policyTermEditInd?: string;
  policyTermFollowCode?: string;
  premiumTermEditInd?: string;
  premiumTermFollowCode?: string;
  exclusionEditInd?: string;
  underwritingDecisionEditInd?: string;
  underwritingApproach?: string;
  premiumType?: string;
  channel?: string;
  isSupported?: string;
  defaultNfoCode?: string;
  loanProtection?: string;
  benefitPlanInd?: string;
  productLegacy?: string;
  livingBenefitCode?: string;
  packageCode?: string;
  waiveCode?: string;
  ageFormularCode?: string;
  applicableToRole?: string;
  bankPayoutInd?: string;
  benefitPlanEditInd?: string;
  ropInd?: string;
  saMultiplierInd?: string;
  jointLifeAllowInd?: string;
  dividendInd?: string;
  icpInd?: string;
  annuityInd?: string;
  healthFamilyGroupInd?: string;
  deathBenefitCode?: string;
  channelFollowCode?: string;
  premiumInUnitBasis?: string;
  productValidateInd?: string;
  deductibleCode?: string;
  maturityInd?: string;
}

export interface riderConfig extends productConfig {
  riderRequiredInd?: string;
  lifeCode?: string;
  maxNo?: number;
  isRider?: boolean;
  linkProductCode?: string;
  subProductType?: string;
  meTermFollowCode?: string;
  feTermFollowCode?: string;
  rateTermFollowCode?: string;
  productCategory?: string;
  productType?: string;
  extProductType?: string;
}

export interface coverageConfig extends productConfig {
  requiredRiderCodeList?: string[];
  riderRequiredInd?: string;
  lifeCode?: string;
  maxNo?: string;
  isRider?: boolean;
  linkProductCode?: string;
  subProductType?: string;
  meTermFollowCode?: string;
  feTermFollowCode?: string;
  rateTermFollowCode?: string;
  productCategory?: string;
  productType?: string;
  extProductType?: string;
  riderCodeList?: string[];
  relatedRider?: riderConfig[];
}

export interface planProductConfig {
  basicPlanProductFeatureList: coverageConfig[];
  otherPlanProductFeatureList: coverageConfig[];
  requiredProductCodeList?: string[];
}