export default {
  claimProcessData: {
    insured: {},
  },
  insuredList: [],
  policyOwnerList: [],
  keyDownStatus: false,
  showSearchModel: false,
  searchInsuredObj: {
    policySource: 'Individual',
    firstName: '',
    middleName: '',
    surname: '',
    dateOfBirth: '',
    gender: '',
    clientId: '',
    policyId: '',
  },
  DrugsDetail:{
    allList:[],
    filterList:[],
    drugsListStore:[],
    show:false,
    total:0,
    filterParams:{},
    searchState:false,
    page:1,
    idx:0
  },
  saveAgentNoList: [],
  premBankAccount: {},
};
