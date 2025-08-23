import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PolicyBenefitModal, BeneficiaryModal, PayeeModal, BankAccountModal } from '../_dto/Models';
import { EPaymentMethod, EContactType } from '../_dto/Enums';
import { nameIsEqual, getBeneficiaryName } from '../_function';

export const duplicateBeneficiary = (
  policyBenefit?: PolicyBenefitModal,
  beneficiaryItem?: BeneficiaryModal,
  clientId?: string
) => {
  const { beneficiaryList } = formUtils.cleanValidateData(policyBenefit);
  const { id, payTo } = formUtils.cleanValidateData(beneficiaryItem);

  const isMultiple = beneficiaryList?.length > 1;

  let result = false;
  const isDuplicate =
    lodash
      .chain(beneficiaryList)
      .filter(
        (beneficiary: PolicyBenefitModal) =>
          beneficiary.id !== id &&
          beneficiary.clientId === formUtils.queryValue(clientId) &&
          beneficiary.payTo === formUtils.queryValue(payTo)
      )
      .size()
      .value() > 0;

  if (isDuplicate) {
    result = isDuplicate;
  }
  return { result, isMultiple };
};

export const duplicatePayee = (
  payeeList: PayeeModal[],
  curPayee?: PayeeModal,
  curValue?: string
) => {
  const payees = lodash.filter(payeeList, (payee: PayeeModal) => {
    return (
      !!curPayee?.id &&
      !!payee?.id &&
      curPayee?.id !== payee.id &&
      nameIsEqual(getBeneficiaryName(payee?.firstName, payee?.surname), curValue)
    );
  });

  return { result: !!payees.length, isMultiple: payeeList?.length > 1 };
};

export const VLD_000664 = (paymentMethodVal: any, contactTypeVal: any, value: any) => {
  if (
    paymentMethodVal !== EPaymentMethod.FasterPayment ||
    contactTypeVal !== EContactType.MobilePhone ||
    !value
  ) {
    return { result: false };
  }

  const valueArr = value.split('-');
  const regExp = /\D/;

  if (
    valueArr.length !== 2 ||
    lodash.size(valueArr?.[0]) < 1 ||
    lodash.size(valueArr?.[0]) > 3 ||
    lodash.size(valueArr?.[1]) < 1 ||
    lodash.size(valueArr?.[1]) > 26 ||
    lodash.some(valueArr, (item) => regExp.test(item))
  ) {
    return { result: true };
  }

  return { result: false };
};

export const duplicateBankAccount = (
  bankAccountList: BankAccountModal[],
  curBankAccountItem?: BankAccountModal,
  curValue?: string
) => {
  const bankAccounts = lodash.filter(bankAccountList, (bankAccount: BankAccountModal) => {
    const { bankAccountNo, id } = bankAccount;
    const bankAccountNoVal = formUtils.queryValue(bankAccountNo);

    return (
      !!id &&
      !!curBankAccountItem?.id &&
      curBankAccountItem?.id !== id &&
      !!bankAccountNoVal &&
      bankAccountNoVal === curValue
    );
  });

  return { result: !!bankAccounts.length, isMultiple: bankAccountList?.length > 1 };
};

export const VLD_000676 = (
  insuredFirstName: any,
  insuredLastName: any,
  payeeFirstName: any,
  payeeLastName: any,
  value: any
) => {
  const target = [{ firstName: payeeFirstName, lastName: payeeLastName }];
  const allTarget = [
    { firstName: payeeFirstName, lastName: payeeLastName },
    { firstName: insuredFirstName, lastName: insuredLastName },
  ];

  const rules = {
    [EPaymentMethod.FasterPayment]: {
      maxLength: 50,
      target: allTarget,
    },
    [EPaymentMethod.DirectCredit]: {
      maxLength: 50,
      target,
    },
    [EPaymentMethod.SystemCheque]: {
      maxLength: 70,
      target,
    },
    [EPaymentMethod.InstantCheque]: {
      maxLength: 70,
      target,
    },
  }?.[value];

  if (lodash.isNil(rules)) {
    return { result: false };
  }

  const handler = (rules: any) => {
    return lodash.some(
      rules?.target,
      (rule: any) =>
        lodash.size(
          `${formUtils.queryValue(rule?.firstName)}${formUtils.queryValue(rule?.lastName)}`
        ) > rules?.maxLength
    )
      ? { result: true }
      : { result: false };
  };

  return handler(rules);
};

/**
 * 在policy owner是multiple的情况下，排除DCA/FPS/7-11三种选项
 * @param payeeList
 * @param relatePolicyOwnerPayeeIds
 * @param value
 */
export const excludePaymentMethod = (
  payeeList?: PayeeModal[],
  relatePolicyOwnerPayeeIds?: string[],
  value?: string
) => {
  if (lodash.isEmpty(relatePolicyOwnerPayeeIds)) return false;

  const exclude: any[] = [
    EPaymentMethod.DirectCredit,
    EPaymentMethod.FasterPayment,
    EPaymentMethod.ElevenCash,
  ];

  const isMultiple =
    lodash
      .chain(payeeList)
      .filter((payee: PayeeModal) => lodash.includes(relatePolicyOwnerPayeeIds, payee.id))
      .map((payee: PayeeModal) => payee.clientId)
      .compact()
      .size()
      .value() > 1;

  return { result: isMultiple && exclude.includes(formUtils.queryValue(value)) };
};

/**
 * 执行校验
 * @param value
 * @param validates
 */
export const executeValidators = (key: string, value: any, validates: any[]) => {
  let required = false;
  const errors: any[] = [];
  const error = { message: '', field: '' };
  for (let i = 0; i < validates.length; i += 1) {
    const validate = validates[i];
    // 当value为null、undefined或者''时
    const isNil = lodash.isNil(value) || (lodash.isString(value) && !lodash.trim(value));
    const errorMsg = lodash.isFunction(validate?.errorMsg)
      ? validate?.errorMsg()
      : validate?.errorMsg;

    if (isNil && lodash.has(validate, 'required')) {
      required = isNil && !!validate?.required;

      if (required) {
        error.field = key;
        error.message = errorMsg;
        errors.push(error);
        break;
      }
    }

    if (
      !isNil &&
      lodash.has(validate, 'validator') &&
      lodash.isFunction(validate?.validator) &&
      lodash.isArray(validate?.params)
    ) {
      const { result, isMultiple } =
        validate?.validator?.(...(validate?.params || []), value) || {};
      required = lodash.isBoolean(isMultiple) ? isMultiple && result : result;
      if (required) {
        error.field = key;
        error.message = errorMsg;
        errors.push(error);
        break;
      }
    }
  }

  return { required, errors };
};

/**
 * 组装校验信息
 * @param key
 * @param value
 * @param requiredData
 */
export const getErrorDecorate = (key: string, value: any, requiredData: any) => {
  let validates = requiredData[key];
  const valueTemp = formUtils.queryValue(value);

  if (lodash.isPlainObject(validates)) {
    validates = [validates];
  }

  const { required, errors } = executeValidators(key, valueTemp, validates);

  const errorDecorate = {
    value: valueTemp,
    name: key,
    validating: false,
    dirty: false,
    errors,
  };

  return required ? errorDecorate : valueTemp;
};

/**
 * 给需要校验的fields补充fields字段
 * @param dataItem
 * @param requiredData
 */
const supplementKeys = (dataItem: any = {}, requiredData: any) => {
  const dataItemTemp = { ...dataItem };
  lodash.mapKeys(requiredData, (_, key: string) => {
    if (lodash.isUndefined(dataItemTemp[key])) {
      dataItemTemp[key] = null;
    }
  });

  return dataItemTemp;
};

/**
 * 校验并组装校验信息
 * @param dataItem
 * @param requiredData
 */
export const validatorRequired = (dataItem: any, requiredData: any) => {
  const dataItemTemp = supplementKeys(dataItem, requiredData);

  if (lodash.isEmpty(requiredData)) return dataItemTemp;

  return lodash.reduce(
    dataItemTemp,
    (output: any, dataVal: any, dataKey: string) => {
      if (lodash.keys(requiredData).includes(dataKey)) {
        lodash.set(output, dataKey, getErrorDecorate(dataKey, dataVal, requiredData));

        return output;
      }

      lodash.set(output, dataKey, dataVal);

      return output;
    },
    {}
  );
};
