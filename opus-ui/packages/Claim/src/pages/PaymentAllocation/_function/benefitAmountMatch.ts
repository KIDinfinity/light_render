import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SwitchEnum } from 'claim/pages/utils/claim';
import type { PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import { calculateBeneficiaryAmount } from '.';
/**
 * 匹配新旧policy benefit 的benefit amount
 * 以下为匹配条件
 *
 * policyNo
 * payablesType
 * payTo
 *
 * @param policyBenefitList 新的policyBenefit
 * @param policyBenefitListO 旧的policyBenefitList
 */
const benefitAmountMatch = (
  policyBenefitList: PolicyBenefitModal[],
  policyBenefitListO?: PolicyBenefitModal[]
) => {
  if (lodash.isEmpty(policyBenefitList) || lodash.isEmpty(policyBenefitListO)) {
    if (!lodash.isEmpty(policyBenefitListO)) return policyBenefitListO;
    if (!lodash.isEmpty(policyBenefitList)) return policyBenefitList;
  }

  const policyBenefitsN = formUtils.cleanValidateData(policyBenefitList);
  const policyBenefitsO = formUtils.cleanValidateData(policyBenefitListO);

  // re-allocation新产生的policy Benefit
  const policyBenefitsNewAdd: PolicyBenefitModal[] = lodash.differenceWith(
    policyBenefitsN,
    policyBenefitsO,
    (prev: PolicyBenefitModal, next: PolicyBenefitModal) =>
      !!prev.policyNo && prev.policyNo === next.policyNo
  );

  const policyBenefitsMatched: PolicyBenefitModal | any[] = lodash
    .chain(policyBenefitsN)
    .map((policyBenefit: PolicyBenefitModal) => {
      const { policyNo, beneficiaryList, manualAdd } = policyBenefit;

      /**
       * 基于旧的policy benefit数据合并新旧数据
       *   1.保留用户新增的policy benefit以及beneficiary数据
       *   2.优先保留用户对policy benefit以及beneficiary数据的修改
       *   3.当re-allocation后产生新的policy benefit和旧的policy benefit数据相同（policy No.相同），
       *     相同的beneficiary（payablesType和payTo相同）的benefit amount不一致时，
       *     更新benefit amount数据，其他数据保留旧的
       *   4.当re-allocation后产生新的policy benefit，则增量添加
       *
       */
      return lodash
        .chain(policyBenefitsO)
        .map((policyBenefitO: PolicyBenefitModal) => {
          const benefitTempO = { ...policyBenefitO };
          const { policyNo: policyNoO, beneficiaryList: beneficiaryListO }: any = benefitTempO;

          // 新旧policy benefit都存在
          if (policyNo && policyNoO && policyNoO === policyNo) {
            // re-allocation新产生的beneficiary
            const beneficiariesNewAdd = lodash.differenceWith(
              beneficiaryList,
              beneficiaryListO,
              (prev: BeneficiaryModal, next: BeneficiaryModal) =>
                !!prev.clientId &&
                !!prev.payTo &&
                prev.clientId === next.clientId &&
                prev.payTo === next.payTo
            );

            const beneficiariesMatched: any[] = lodash
              .chain(beneficiaryListO)
              .map((beneficiaryItemO: BeneficiaryModal) => {
                let beneficiaryTempO = { ...beneficiaryItemO };
                const { clientId, payTo, manualAdd: manualAddO } = beneficiaryTempO;
                const beneficiaryTempN: any = lodash.find(beneficiaryList, { clientId, payTo });

                if (!lodash.isEmpty(beneficiaryTempN)) {
                  const {
                    benefitAmount,
                    payoutCurrency,
                    policyCurrency,
                    payoutAmount,
                    beneficiaryPercentage,
                    beneficiaryAmount,
                    payoutExchangeRate,
                  } = beneficiaryTempN;

                  // 更新旧的beneficiary的benefit amount和payout amount后返回
                  beneficiaryTempO = calculateBeneficiaryAmount(beneficiaryTempO, benefitAmount);
                  lodash.set(beneficiaryTempO, 'payoutCurrency', payoutCurrency);
                  lodash.set(beneficiaryTempO, 'policyCurrency', policyCurrency);
                  lodash.set(beneficiaryTempO, 'payoutAmount', payoutAmount);
                  lodash.set(beneficiaryTempO, 'beneficiaryPercentage', beneficiaryPercentage);
                  lodash.set(beneficiaryTempO, 'payoutExchangeRate', payoutExchangeRate);
                  lodash.set(beneficiaryTempO, 'beneficiaryAmount', beneficiaryAmount);

                  return beneficiaryTempO;
                }

                // 返回用户手动添加的beneficiary
                if (manualAddO === SwitchEnum.YES) {
                  return beneficiaryItemO;
                }

                // 删除既不能和re-allocation之后匹配又非手动添加的beneficiary
                return null;
              })
              .compact()
              .value();

            benefitTempO.beneficiaryList = lodash
              .chain(beneficiariesNewAdd)
              .concat(beneficiariesMatched)
              .compact()
              .value();

            return benefitTempO;
          }

          // 新的不存在，旧的存在，且是手动添加的policy benefit,保留手动添加的数据（返回旧的）
          if (policyNo && policyNoO && policyNoO !== policyNo && manualAdd === SwitchEnum.YES) {
            return policyBenefitO;
          }

          // 既不能和新的policy benefit匹配，又不是手动添加的删除
          return null;
        })
        .compact()
        .value();
    })
    .flatten()
    .compact()
    .value();

  return lodash
    .chain(policyBenefitsNewAdd)
    .concat(policyBenefitsMatched)
    .compact()
    .uniqBy('policyNo')
    .value();
};

export default benefitAmountMatch;
