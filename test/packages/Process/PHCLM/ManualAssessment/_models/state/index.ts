import { paymentState } from 'process/Payment/_models';

export default {
  claimProcessData: {
    exchangeRateList: [],
  },
  claimEntities: {},
  treatmentPayableAddItem: null,
  currencyModalShowStatus: false,
  invoiceCurrencyObj: {
    invoiceId: '',
    invoiceCurrency: '',
    exchangeDate: '',
  },
  exchangeDateModalShowStatus: false,
  exchangeRateListForInvoice: [],
  policyOwnerList: [],
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
  isShowPopUpPayable: false,
  popUpPayable: {},
  showPopUpEditPayable: false,
  PopUpEditPayable: {},
  popUpPayablePoint: {
    top: 0,
    left: 0,
  },
  saveAgentNoList: [],
  isClickClaimRegister: false,
  // summary折叠状态
  summaryExpand: {},
  adjustmentFactorState: {},
  listBenefitFactor: [],
  adjustmentFactorListMap: {},
  roomTypeDict: [],
  isShowServiceItemBreakdown: false,
  serviceItemBreakdownForms: [],
  claimServiceItemBreakDownList: [],
  breakdownConfirmServiceItemId: '',
  changeAdjustmentFactorList: false,
  serviceItemFeesListMap: {},
  searchAdjustSurgeryInfo: {},

  ...paymentState,
};
