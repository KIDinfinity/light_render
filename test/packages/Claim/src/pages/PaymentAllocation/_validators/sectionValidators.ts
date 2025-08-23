import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { tenant, Region } from '@/components/Tenant';
import type { PayeeModal, PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import { validatorPayee, validatorBeneficiary } from './validatorData';
import { validatorRequired } from './validatorUtils';
import { getTotalBenefitAmount, getTotalClaimPayableAmount } from './_functions';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param claimData 理赔对象
 */
export const VLD_000334_T = (claimData: any) => {
  const payeeList: PayeeModal[] = claimData?.payeeList;
  const { claimDecision } = claimData;
  const totalPaymentAmount = +lodash
    .chain(payeeList)
    .filter((payeeItem: PayeeModal) => !!formUtils.queryValue(payeeItem.paymentAmount))
    .reduce((total, payee: PayeeModal) => {
      return add(formUtils.queryValue(payee.paymentAmount) as number, total);
    }, 0)
    .value();
  const decisionPayableAmount = formUtils.queryValue(claimDecision?.totalPayableAmount);

  if (decisionPayableAmount && decisionPayableAmount !== totalPaymentAmount)
    return ['Label_COM_WarningMessage:MSG_000362'];

  return [];
};

const policyNoTotalPayableAmountDiff = (allclaimPayableList, beneficiaryList, policyNo) => {
  const claimPayableGrouped = lodash.groupBy(allclaimPayableList, 'policyNo');

  const payableAmounts = +lodash
    .chain(claimPayableGrouped[policyNo])
    .filter((payable: any) => {
      const claimDecision = formUtils.queryValue(payable.claimDecision);
      const payableAmount = formUtils.queryValue(payable.payableAmount);

      return (
        payableAmount &&
        (claimDecision === ClaimDecision.approve ||
          claimDecision === ClaimDecision.exGratia ||
          claimDecision === ClaimDecision.pending)
      );
    })
    .reduce((total, payable: any) => {
      return add(formUtils.queryValue(payable.payableAmount) as number, total);
    }, 0)
    .value();

  const benefitAmounts = +lodash
    .chain(beneficiaryList)
    .filter((beneficiary: BeneficiaryModal) => !!formUtils.queryValue(beneficiary.benefitAmount))
    .reduce((total, beneficiary: BeneficiaryModal) => {
      return add(formUtils.queryValue(beneficiary.benefitAmount) as number, total);
    }, 0)
    .value();

  return benefitAmounts !== payableAmounts;
};
/**
 * 以保单号分组校验policy benefit以及payable对应的金额是否一致
 * @param policyBenefitList policy benefit数据
 * @param claimPayableList payable数据
 */
export const VLD_000334 = (curPolicyBenefit: PolicyBenefitModal, claimPayableList: any[]) => {
  const output = { result: false };

  const regionRequire = tenant.region({
    [Region.PH]: true,
    notMatch: false,
  });

  if (regionRequire) return output;

  if (lodash.isEmpty(curPolicyBenefit) || lodash.isEmpty(claimPayableList)) return output;
  const { policyNo, beneficiaryList } = formUtils.cleanValidateData(curPolicyBenefit);

  // 加这个功能是为了防止算出来的值有错，客户直接submit通过
  output.result = policyNoTotalPayableAmountDiff(claimPayableList, beneficiaryList, policyNo);

  return output;
};

export const validatorPolicyBenefit = {
  policyNo: {
    validator: VLD_000334,
    params: {},
    errorMsg: () => [formatMessageApi({ Label_COM_WarningMessage: 'MSG_000362' })],
  },
};
/**
 * 校验同一个保单号下面的payable amount和benefit amount总和是否相等
 * @param policyBenefit
 * @param claimPayableList
 */
export const VLD_PayableBenefitAmount = (policyBenefit: any, claimPayableList: any[]) => {
  if (lodash.isEmpty(policyBenefit) || lodash.isEmpty(claimPayableList)) return policyBenefit;
  const policyBenefitTemp = { ...policyBenefit };

  const { policyNo }: any = lodash.cloneDeep(validatorPolicyBenefit);
  const validatePolicyBenefit = { policyNo };
  validatePolicyBenefit.policyNo.params = [policyBenefitTemp, claimPayableList];

  return validatorRequired(policyBenefitTemp, validatePolicyBenefit);
};

/**
 * 数据层校验payee的multiple policy owner
 * @param payeeList
 * @param relatePolicyOwnerPayeeIds
 */
export const VLD_MultiplePolicyOwner = (
  payeeList: PayeeModal[],
  relatePolicyOwnerPayeeIds: string[]
) => {
  if (lodash.isEmpty(payeeList) || lodash.isEmpty(relatePolicyOwnerPayeeIds)) return payeeList;

  return lodash.map(payeeList, (payee: PayeeModal) => {
    const payeeTemp = { ...payee };
    const { paymentMethod: paymentMethodVal } = payeeTemp;
    const { paymentMethod }: any = lodash.cloneDeep(validatorPayee);
    const validatePayee = { paymentMethod };

    validatePayee.paymentMethod[0].required = true;
    validatePayee.paymentMethod[1].params = [
      payeeList,
      relatePolicyOwnerPayeeIds,
      paymentMethodVal,
    ];

    return validatorRequired(payeeTemp, validatePayee);
  });
};

export const VLD_MultipleBeneficiary = (
  policyBenefit: any,
  beneficiary: any,
  clientIdVal?: string
) => {
  if (lodash.isEmpty(policyBenefit) || lodash.isEmpty(beneficiary)) return policyBenefit;
  const policyBenefitTemp = formUtils.cleanValidateData(policyBenefit);

  const { clientId }: any = lodash.cloneDeep(validatorBeneficiary);
  const validateBeneficiary = { clientId };
  validateBeneficiary.clientId[1].params = [
    policyBenefitTemp,
    beneficiary,
    formUtils.queryValue(clientIdVal),
  ];

  return validatorRequired(beneficiary, validateBeneficiary);
};

export const VLD_000939 = (claimPayableList: any, claimDecision) => {
  const res =
    formUtils.queryValue(claimDecision?.totalPayableAmount) !==
    getTotalClaimPayableAmount(claimPayableList);
  if (res) {
    return formatMessageApi({ Label_COM_WarningMessage: 'MSG_000960' });
  }
  return false;
};

export const VLD_000940 = (
  claimPayableList: any,
  treatmentPayableListMap,
  serviceItemPayableListMap
) => {
  const res = lodash.find(claimPayableList, (payable) => {
    const payableAmount = formUtils.queryValue(payable.payableAmount);
    const childPayable = payable.treatmentPayableList ||
      payable.serviceItemPayableList || [payable.lifePayable];
    const childPayableAmount = +lodash
      .chain(childPayable)
      // .filter(({ claimDecision }) => claimDecision == payable)
      .reduce((total, item) => {
        let cur = item;
        if (typeof cur === 'string') {
          cur = treatmentPayableListMap[cur] || serviceItemPayableListMap[cur];
        }
        return add(formUtils.queryValue(cur?.payableAmount) || 0, total);
      }, 0)
      .value();

    return payableAmount !== childPayableAmount;
  });
  if (res) {
    return formatMessageApi({ Label_COM_WarningMessage: 'MSG_000961' });
  }
  return false;
};

export const VLD_000934 = (policyBenefitList = [], claimPayableList) => {
  const res = policyBenefitList.find((i) =>
    policyNoTotalPayableAmountDiff(claimPayableList, i.beneficiaryList, i.policyNo)
  );
  if (res) {
    return formatMessageApi({ Label_COM_WarningMessage: 'MSG_000952' }, res.policyNo);
  }
  return false;
};

export const VLD_000334_PH = (policyBenefitList, claimPayableList) => {
  const totalPolicyBenefitAmount = getTotalBenefitAmount(policyBenefitList);
  const claimPayableAmount = getTotalClaimPayableAmount(claimPayableList);

  if (totalPolicyBenefitAmount !== claimPayableAmount) {
    return formatMessageApi({ Label_COM_WarningMessage: 'MSG_000362' });
  }
  return false;
};

export const VLD_000928 = (policyBenefitList = []) => {
  const notEqualBenefit = policyBenefitList.find((i) => {
    const sum = i?.beneficiaryList?.reduce(
      (acc, j) => add(formUtils.queryValue(j.beneficiaryAmount) || 0, acc),
      0
    );
    return formUtils.queryValue(i.benefitAmount) !== sum;
  });

  if (notEqualBenefit) {
    return formatMessageApi({ Label_COM_WarningMessage: 'MSG_000942' }, notEqualBenefit.policyNo);
  }
  return false;
};

export const VLD_000929 = (policyBenefitList = []) => {
  const notEqualBenefit = policyBenefitList.find((i) => {
    const sum = i.beneficiaryList?.reduce(
      (acc, j) => add(formUtils.queryValue(j.beneficiaryPercentage) || 0, acc),
      0
    );
    return 100 > sum;
  });

  if (notEqualBenefit) {
    return formatMessageApi({ Label_COM_WarningMessage: 'MSG_000943' }, notEqualBenefit.policyNo);
  }
  return false;
};
