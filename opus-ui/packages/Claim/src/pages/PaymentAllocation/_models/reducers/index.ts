import addBankAccount from './addBankAccount';
import addBenefitciary from './addBenefitciary';
import addChequeRemark from './addChequeRemark';
import addPayee from './addPayee';
import deleteBankAccount from './deleteBankAccount';
import deleteBeneficiary from './deleteBeneficiary';
import deleteChequeRemark from './deleteChequeRemark';
import deletePayee from './deletePayee';
import fillBeneficiary from './fillBeneficiary';
import initedAllocation from './initedAllocation';
import initPayeeItem from './initPayeeItem';
import payeeAllocationAdd from './payeeAllocationAdd';
import payeeAllocationDelete from './payeeAllocationDelete';
import payeeAllocationLinkPayee from './payeeAllocationLinkPayee';
import payeeAllocationUpdate from './payeeAllocationUpdate';
import PayeeItemActiveIdUpdate from './PayeeItemActiveIdUpdate';
import payeeItemAdd from './payeeItemAdd';
import PayeeItemBankAccountDefaultUpdate from './PayeeItemBankAccountDefaultUpdate';
import PayeeItemBankAccountUpdate from './PayeeItemBankAccountUpdate';
import PayeeItemContactListUpdate from './PayeeItemContactListUpdate';
import PayeeItemDelete from './PayeeItemDelete';
import PayeeItemUpdate from './PayeeItemUpdate';
import addRedepositPolicy from './redepositPolicy/addRedepositPolicy';
import deleteRedepositPolicy from './redepositPolicy/deleteRedepositPolicy';
import saveRedepositExchangeRateList from './redepositPolicy/saveRedepositExchangeRateList';
import saveRedepositPolicy from './redepositPolicy/saveRedepositPolicy';
import updateRedepositPolicyExchangeRates from './redepositPolicy/updateRedepositPolicyExchangeRates';
import updateRedepositPolicyList from './redepositPolicy/updateRedepositPolicyList';
import registerForm from './registerForm';
import resetAllocation from './resetAllocation';
import saveBankAccount from './saveBankAccount';
import saveBankAccountList from './saveBankAccountList';
import saveBeneficiary from './saveBeneficiary';
import saveChequeRemark from './saveChequeRemark';
import saveClaimData from './saveClaimData';
import saveContact from './saveContact';
import saveCurrencies from './saveCurrencies';
import saveErrors from './saveErrors';
import saveExchangeRates from './saveExchangeRates';
import saveListPolicy from './saveListPolicy';
import saveOriginClaimProcessData from './saveOriginClaimProcessData';
import saveOwnerPolicyList from './saveOwnerPolicyList';
import savePayeeDicts from './savePayeeDicts';
import savePayeeInfo from './savePayeeInfo';
import savePayeeMapForm from './savePayeeMapForm';
import savePaymentMethod from './savePaymentMethod';
import savePolicy from './savePolicy';
import saveProductNameMap from './saveProductNameMap';
import saveState from './saveState';
import setBeneficiaryPopUp from './setBeneficiaryPopUp';
import setDefaultPayment from './setDefaultPayment';
import setPrintDestinationSelectedDicts from './setPrintDestinationSelectedDicts';
import toggleModal from './toggleModal';
import unRegisterForm from './unRegisterForm';
import updatePayeePayByPolicyCurrency from './updatePayeePayByPolicyCurrency';
import updatePayeePaymentMethod from './updatePayeePaymentMethod';
import updateRatesPayoutAmount from './updateRatesPayoutAmount';

export default {
  resetAllocation,
  saveClaimData,
  toggleModal,
  savePolicy,
  saveBeneficiary,
  savePayeeInfo,
  saveContact,
  saveChequeRemark,
  saveBankAccount,
  addBankAccount,
  addPayee,
  deletePayee,
  deleteBankAccount,
  registerForm,
  unRegisterForm,
  savePayeeMapForm,
  initedAllocation,
  saveState,
  saveErrors,
  savePayeeDicts,
  addBenefitciary,
  deleteBeneficiary,
  saveListPolicy,
  saveExchangeRates,
  updateRatesPayoutAmount,
  addChequeRemark,
  deleteChequeRemark,
  saveCurrencies,
  saveBankAccountList,
  initPayeeItem,
  setDefaultPayment,

  saveRedepositPolicy,
  deleteRedepositPolicy,
  addRedepositPolicy,
  saveRedepositExchangeRateList,
  updateRedepositPolicyExchangeRates,
  updateRedepositPolicyList,

  updatePayeePaymentMethod,
  updatePayeePayByPolicyCurrency,
  saveOriginClaimProcessData,
  setPrintDestinationSelectedDicts,
  savePaymentMethod,

  PayeeItemActiveIdUpdate,
  payeeItemAdd,
  PayeeItemDelete,
  PayeeItemUpdate,
  payeeAllocationDelete,
  PayeeItemContactListUpdate,
  PayeeItemBankAccountUpdate,
  PayeeItemBankAccountDefaultUpdate,

  payeeAllocationAdd,
  payeeAllocationUpdate,
  saveProductNameMap,
  fillBeneficiary,
  setBeneficiaryPopUp,
  payeeAllocationLinkPayee,
  saveOwnerPolicyList,
};
