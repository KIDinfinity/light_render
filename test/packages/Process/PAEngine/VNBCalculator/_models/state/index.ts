export interface BasicInfo {
  salesProcess?: string;
  premiumPayment?: string;
  careCard?: string;
}

export interface PlanItem {
  pid?: string;
  mainBenefitSAFactor?: number;
  sumArrured1?: number;
  sumArrured2?: number;
  sumArrured3?: number;
  sumArrured4?: number;
  sumArrured5?: number;
  sumArrured6?: number;
  sumArrured7?: number;
  sumArrured8?: number;
  sumArrured9?: number;
  sumArrured10?: number;
}

export interface Alterations {
  ageGroup?: Record<string, number>;
  gender?: Record<string, number>;
  occupationClass?: Record<string, number>;
  paymentMode?: Record<string, number>;
  planAllocation?: Record<string, number>;
}

export interface AlterationItem {
  code?: string;
  allocation?: string;
}

export interface OccClassAgePremium {
  occClassCode?: string;
  ageRange?: string;
  premuim1?: number;
  premuim2?: number;
  premuim3?: number;
  premuim4?: number;
  premuim5?: number;
  premuim6?: number;
  premuim7?: number;
  premuim8?: number;
  premuim9?: number;
  premuim10?: number;
}

export interface ProductInfo {
  pid?: string;
  productName?: { en?: string };
  status?: string;
  properties?: { isMainBenefit?: boolean };
}
export interface basicInfo {
  pid?: string;
  productName?: { en?: string };
  status?: string;
  properties?: { isMainBenefit?: boolean };
}

export interface AlterationConfig {
  value?: string;
  label?: { en?: string };
}

export interface BasicConfig {
  channel?: string;
  salesProcess?: string;
  premiumPayment?: string;
  careCard?: string;
}

export interface VNBSummary {
  premBeforeRI: number;
  claimBeforeRI: number;
  expenseBeforeRI: number;
  oicTaxBeforeRI: number;
  comOVBeforeRI: number;
  incUPRBeforeRI: number;
  investmentBeforeRI: number;
  taxBeforeRI: number;
  totalPMBeforeRI: number;
  premAfterRI: number;
  claimAfterRI: number;
  expenseAfterRI: number;
  oicTaxAfterRI: number;
  commissionAfterRI: number;
  incUPRAfterRI: number;
  riCostAfterRI: number;
  investmentAfterRI: number;
  taxAfterRI: number;
  totalPMAfterRI: number;
  ape: number;
  pm: number;
  vnb: number;
  approver: number;
}

export interface VNBCalculatorState {
  product?: string;
  basicInfo?: BasicInfo;
  targetAPE?: number;
  basicBenefit?: PlanItem;
  subBenefits?: Record<string, PlanItem>;
  alterations?: Alterations;
  occClassAgePremium?: Record<string, number>;
  productInfo?: Record<string, ProductInfo>;
  basicBenefitConfig?: Record<string, ProductInfo>;
  basicConfig: Record<string, BasicConfig>;
  subBenefitConfig?: Record<string, ProductInfo>;
  ageGroupConfig?: Record<string, AlterationConfig>;
  genderConfig?: Record<string, AlterationConfig>;
  occupationClassConfig?: Record<string, AlterationConfig>;
  paymentModeConfig?: Record<string, AlterationConfig>;
  maxPremiumConfig?: Record<string, Record<string, number[]>>;
  minPremiumConfig?: Record<string, Record<string, number[]>>;
  midPremiumConfig?: Record<string, Record<string, number[]>>;
  summary?: VNBSummary;
  reportLang: string;
}

const state: VNBCalculatorState = {
  product: '',
  basicInfo: {},
  subBenefits: {},
  productInfo: {},
  alterations: {},
  basicConfig: {},
  basicBenefitConfig: {},
  subBenefitConfig: {},
  ageGroupConfig: {},
  reportLang: 'en',
};

export default state;
