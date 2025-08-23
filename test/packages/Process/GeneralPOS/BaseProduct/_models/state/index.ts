import { v4 as uuidv4 } from 'uuid';

export default {
  default: {
    addressChangeInfo: {
      id: uuidv4(),
      countryCode: 'THA',
    },
  },

  country: [],
  province: [],
  district: [],
  city: [],
  sortApplyListMap: {},

  transactionTypeCodeMap: {},

  processData: {},
  entities: {},
  servicingInit: false,
  runPaymentModeRule: true,
  UIConfig: [],

  personName: {},

  allFundConfigList: [],
  allFundConfigListMap: {},
  allBank: [],
  bankBranchByCodeMap: {},
  extraField: {},
  priceByfundCode: {},
  needReCalEffective: null,
  prevEffectiveDate: null,

  clientRole: {
    OwnerRoleList: [],
    OtherRoleList: [],
  },
  selectRole: '',
  fundsDictsMap: {},
  isReassess: null,
  planProductConfig: {
    otherPlanProductFeatureList: [],
    basicPlanProductFeatureList: [],
  },
  isHistory: false,
  globalConfig: {},
};
