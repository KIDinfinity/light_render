import lodash from 'lodash';
import TaskDefKey from 'enum/TaskDefKey';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import {
  duplicateBankAccount,
  duplicatePayee,
  duplicateBeneficiary,
  validatorRequired,
  excludePaymentMethod,
  VLD_000664,
  VLD_000676,
} from './validatorUtils';

import { VLD_000334 } from './sectionValidators';

import { EPaymentMethod, EContactType } from '../_dto/Enums';
import type {
  PolicyBenefitModal,
  BeneficiaryModal,
  PayeeModal,
  BankAccountModal,
  ContactModal,
} from '../_dto/Models';

const ERR_000001_MSG = () => [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];

export const validatorPolicyBenefit = {
  policyNo: {
    validator: VLD_000334,
    params: {},
    errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000362' })],
  },
};

export const validatorBeneficiary = {
  payTo: [{ required: false, errorMsg: ERR_000001_MSG }],
  clientId: [
    { required: false, errorMsg: ERR_000001_MSG },
    {
      validator: duplicateBeneficiary,
      params: {},
      errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000359' })],
    },
  ],
  payeeId: { required: false, errorMsg: ERR_000001_MSG },
  payoutAmount: { required: false, errorMsg: ERR_000001_MSG },
  exchangeRateRecord: { required: false, errorMsg: ERR_000001_MSG },
  payoutCurrency: { required: false, errorMsg: ERR_000001_MSG },
  benefitAmount: { required: false, errorMsg: ERR_000001_MSG },
  policyCurrency: { required: false, errorMsg: ERR_000001_MSG },
};

export const validatorPayee = {
  firstName: [
    { required: false, errorMsg: ERR_000001_MSG },
    {
      validator: duplicatePayee,
      params: {},
      errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000360' })],
    },
  ],
  surname: [
    { required: false, errorMsg: ERR_000001_MSG },
    {
      validator: duplicatePayee,
      params: {},
      errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000360' })],
    },
  ],
  paymentMethod: [
    { required: false, errorMsg: ERR_000001_MSG },
    {
      validator: excludePaymentMethod,
      params: {},
      errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000456' })],
    },
    {
      validator: VLD_000676,
      params: {},
      errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000616' })],
    },
  ],
  ctaCheckNo: { required: false, errorMsg: ERR_000001_MSG },
  ctaCheckDate: { required: false, errorMsg: ERR_000001_MSG },
  sourceBank: { required: false, errorMsg: ERR_000001_MSG },
  payoutAmount: { required: false, errorMsg: ERR_000001_MSG },
  payoutCurrency: { required: false, errorMsg: ERR_000001_MSG },
  chequeRemark: { required: false, errorMsg: ERR_000001_MSG },
  subPaymentMethod: { required: false, errorMsg: ERR_000001_MSG },
};

export const validatorBankAccount = {
  isSelect: { required: false, errorMsg: ERR_000001_MSG },
  accountHolder: { required: false, errorMsg: ERR_000001_MSG },
  bankAccountNo: [
    {
      required: false,
      errorMsg: ERR_000001_MSG,
    },
    {
      validator: duplicateBankAccount,
      params: {},
      errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000361' })],
    },
  ],
  bankCode: { required: false, errorMsg: ERR_000001_MSG },
  bankName: { required: false, errorMsg: ERR_000001_MSG },
  branchCode: { required: false, errorMsg: ERR_000001_MSG },
  branchName: { required: false, errorMsg: ERR_000001_MSG },
  passbookCode: { required: false, errorMsg: ERR_000001_MSG },
  passbookNo: { required: false, errorMsg: ERR_000001_MSG },
  bankAccountName: { required: false, errorMsg: ERR_000001_MSG },
  accountType: { required: false, errorMsg: ERR_000001_MSG },
  currencyCode: { required: false, errorMsg: ERR_000001_MSG },
  currentFrom: { required: false, errorMsg: ERR_000001_MSG },
  currentTo: { required: false, errorMsg: ERR_000001_MSG },
  bankType: { required: false, errorMsg: ERR_000001_MSG },
};

export const validatorContact = {
  contactType: { required: false, errorMsg: ERR_000001_MSG },
  telNo: [
    { required: false, errorMsg: ERR_000001_MSG },
    {
      validator: VLD_000664,
      params: {},
      errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000603' })],
    },
  ],
  email: { required: false, errorMsg: ERR_000001_MSG },
};

/**
 * 数据层对数据更新后进行校验，并添加校验信息
 * @param claimData claim 对象数据
 */
export const validatorData = (claimData: any, params: any = {}) => {
  if (lodash.isEmpty(claimData)) return claimData;
  const { payeeList, policyBenefitList, claimPayableList, insured } = claimData;
  const { taskDetail, relatePolicyOwnerPayeeIds } = params;
  // eslint-disable-next-line no-param-reassign
  claimData.policyBenefitList = lodash.map(
    policyBenefitList,
    (policyBenefit: PolicyBenefitModal) => {
      const { beneficiaryList } = policyBenefit;
      const validatePolicyBenefit = lodash.cloneDeep(validatorPolicyBenefit);

      tenant.region({
        [Region.PH]: null,
        notMatch: () => {
          validatePolicyBenefit.policyNo.params = [policyBenefit, claimPayableList];
        },
      });

      const policyBenefitTemp = validatorRequired(policyBenefit, validatePolicyBenefit);

      policyBenefitTemp.beneficiaryList = lodash.map(
        beneficiaryList,
        (beneficiary: BeneficiaryModal) => {
          const validateBeneficiary = lodash.cloneDeep(validatorBeneficiary);
          const validateCurrency = () => {
            validateBeneficiary.policyCurrency.required = true;
            validateBeneficiary.payoutAmount.required = true;
            validateBeneficiary.payoutCurrency.required = true;
            validateBeneficiary.exchangeRateRecord.required = true;
            validateBeneficiary.payTo[0].required = true;
            validateBeneficiary.payeeId.required = true;
            validateBeneficiary.benefitAmount.required = true;
            validateBeneficiary.clientId[0].required = true;
          };

          tenant.region({
            [Region.HK]: validateCurrency,
            [Region.JP]: () => {
              validateCurrency();
              validateBeneficiary.exchangeRateRecord.required = false;
            },
            [Region.ID]: validateCurrency,
            [Region.TH]: validateCurrency,
            notMatch: () => {
              validateBeneficiary.payeeId.required = true;
              validateBeneficiary.payTo[0].required = true;
              validateBeneficiary.benefitAmount.required = true;

              validateBeneficiary.clientId[0].required = true;
              validateBeneficiary.clientId[1].params = [
                policyBenefit,
                beneficiary,
                beneficiary?.clientId,
              ];
            },
          });

          const beneficiaryTemp = validatorRequired(beneficiary, validateBeneficiary);

          return beneficiaryTemp;
        }
      );

      return policyBenefitTemp;
    }
  );

  // eslint-disable-next-line no-param-reassign
  claimData.payeeList = lodash.map(payeeList, (payeeItem: PayeeModal) => {
    const { payeeBankAccountList, paymentMethod, payeeContactList } = payeeItem;
    const paymentMethodVal = formUtils.queryValue(paymentMethod);
    const isActivityCTA = taskDetail?.taskDefKey === TaskDefKey.PH_CLM_ACT005;
    const isCheck = paymentMethodVal === EPaymentMethod.ByCheck;
    const isBankTransfer = paymentMethodVal === EPaymentMethod.BankTransfer;
    let checkSourceBank = isCheck;
    const validatePayee = lodash.cloneDeep(validatorPayee);
    const { contactType } = lodash.chain(payeeContactList).compact().first().value();

    validatePayee.firstName[1].params = [payeeList, payeeItem];
    validatePayee.surname[0].required = true;
    validatePayee.surname[1].params = [payeeList, payeeItem];
    validatePayee.paymentMethod[0].required = tenant.isPH()? false : true;
    validatePayee.paymentMethod[1].params = [
      payeeList,
      relatePolicyOwnerPayeeIds,
      payeeItem.paymentMethod,
    ];
    validatePayee.ctaCheckNo.required = isActivityCTA;
    validatePayee.ctaCheckDate.required = isActivityCTA;
    if (payeeItem.paymentMethod === 'CHQM') {
      validatePayee.subPaymentMethod.required = true;
    }
    const validateCurrency = () => {
      validatePayee.payoutAmount.required = true;
      validatePayee.payoutCurrency.required = true;
    };

    tenant.region({
      [Region.HK]: () => {
        const { firstName: payeeFirstName, surname: payeeLastName } = payeeItem || {};
        const { firstName: insuredFirstName, surname: insuredLastName } = insured || {};
        validatePayee.paymentMethod[2].params = [
          insuredFirstName,
          insuredLastName,
          payeeFirstName,
          payeeLastName,
          formUtils.queryValue(payeeItem?.paymentMethod),
        ];
        validateCurrency();
      },
      [Region.JP]: validateCurrency,
      [Region.TH]: validateCurrency,
      [Region.ID]: validateCurrency,
      [Region.PH]: () => {
        checkSourceBank = checkSourceBank || isBankTransfer;
      },
    });

    const payeeListTemp: PayeeModal = validatorRequired(payeeItem, validatePayee);

    payeeListTemp.payeeBankAccountList = lodash.map(
      payeeBankAccountList,
      (bankAccount: BankAccountModal) => {
        const isPostBank = paymentMethodVal === EPaymentMethod.PostBank;
        const manualAdd =
          lodash.isString(bankAccount?.manualAdd) && bankAccount?.manualAdd === SwitchEnum.YES;
        const isBank = lodash.includes(
          [EPaymentMethod.BankTransfer, EPaymentMethod.PremiumAccount],
          paymentMethodVal
        );
        const requiredDCA = lodash.includes(
          [EPaymentMethod.BankTransfer, EPaymentMethod.DirectCredit],
          paymentMethodVal
        );
        const isPremiumAccount = paymentMethodVal === EPaymentMethod.PremiumAccount;
        const isSelect = formUtils.queryValue(bankAccount?.isSelect);
        const accountRequired = isSelect && requiredDCA && !isPremiumAccount;

        const validateBankAccount = lodash.cloneDeep(validatorBankAccount);
        const validateBankHandler = () => {
          if (isBank) {
            validateBankAccount.accountHolder.required = accountRequired;
            validateBankAccount.bankCode.required = accountRequired;
            validateBankAccount.bankName.required = accountRequired;
            validateBankAccount.branchCode.required = accountRequired;
            validateBankAccount.branchName.required = accountRequired;
            validateBankAccount.bankAccountNo[0].required = accountRequired;
          }
        };
        tenant.region({
          [Region.HK]: validateBankHandler,
          [Region.TH]: validateBankHandler,
          [Region.ID]: validateBankHandler,
          [Region.JP]: () => {
            validateBankHandler();
            validateBankAccount.bankType.required = accountRequired;
            validateBankAccount.accountType.required =
              manualAdd || paymentMethodVal === EPaymentMethod.BankTransfer;
          },
          [Region.PH]: () => {
            if (isBankTransfer) {
              validateBankAccount.bankAccountNo[0].required = manualAdd;
              validateBankAccount.bankAccountNo[1].params = [payeeBankAccountList, bankAccount];
              validateBankAccount.bankCode.required = manualAdd;
              validateBankAccount.bankName.required = manualAdd;
              validateBankAccount.branchCode.required = manualAdd;
              validateBankAccount.branchName.required = manualAdd;
              validateBankAccount.bankAccountName.required = manualAdd;
              validateBankAccount.accountType.required = manualAdd;
              validateBankAccount.currencyCode.required = manualAdd;
              validateBankAccount.currentFrom.required = manualAdd;
              validateBankAccount.currentTo.required = manualAdd;
            }
          },
          notMatch: () => {
            if (isBank) {
              validateBankAccount.accountHolder.required = manualAdd;
              validateBankAccount.bankAccountNo[0].required = manualAdd;
              validateBankAccount.bankAccountNo[1].params = [payeeBankAccountList, bankAccount];
              validateBankAccount.bankCode.required = manualAdd;
              validateBankAccount.bankName.required = manualAdd;
              validateBankAccount.branchCode.required = manualAdd;
              validateBankAccount.branchName.required = manualAdd;
            }
          },
        });

        if (isPostBank) {
          validateBankAccount.accountHolder.required = manualAdd;
          validateBankAccount.passbookCode.required = manualAdd || isPostBank;
          validateBankAccount.passbookNo.required = manualAdd || isPostBank;
        }

        if (isCheck) {
          return bankAccount;
        }

        const bankAccountTemp = validatorRequired(bankAccount, validateBankAccount);

        return bankAccountTemp;
      }
    );

    payeeListTemp.payeeContactList = lodash.map(payeeContactList, (payeeContact: ContactModal) => {
      const validateContact = lodash.cloneDeep(validatorContact);
      const validateHandler = () => {
        const VLD_000344 = paymentMethodVal === EPaymentMethod.FasterPayment;
        const VLD_000342 = paymentMethodVal === EPaymentMethod.ElevenCash;
        const VLD_000345 =
          VLD_000344 &&
          lodash.includes([EContactType.FPSId, EContactType.MobilePhone], payeeContact.contactType);
        const VLD_000346 = VLD_000344 && contactType === EContactType.Email;

        validateContact.contactType.required = VLD_000344;
        validateContact.telNo[0].required = VLD_000342 || VLD_000345;
        validateContact.telNo[1].params = [
          paymentMethodVal,
          formUtils.queryValue(payeeContact.contactType),
        ];
        validateContact.email.required = VLD_000346;
      };

      tenant.region({
        [Region.HK]: validateHandler,
        [Region.JP]: validateHandler,
        [Region.ID]: validateHandler,
        [Region.TH]: validateHandler,
      });

      const contactTemp = validatorRequired(payeeContact, validateContact);

      return contactTemp;
    });

    return payeeListTemp;
  });

  return claimData;
};
