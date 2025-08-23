import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import {
  // payeeAssembly,
  judgePayeeAdd,
  getPayeeDicts,
  addPayeeMapBeneficiary,
  supplementPayee,
  handleBeneficiary,
  setBeneficiaryVal,
} from '.';
import { ERelationshipWithInsured } from '../_dto/Enums';

/**
 * 给claim data进行补数据以及相关初始化处理
 * @param claimData
 * @param submitting
 */
const supplementClaimData = (claimData?: any, submitting?: boolean) => {
  if (lodash.isEmpty(claimData)) return claimData;
  const tempClaimData: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimData));
  const { policyBenefitList, payeeList } = tempClaimData;

  const tempPolicyBenefitList: any[] = lodash
    .chain(policyBenefitList)
    .compact()
    .map((policyBenefit: PolicyBenefitModal) => {
      const beneficiaries = lodash
        .chain(policyBenefit?.beneficiaryList || [])
        .compact()
        .map((beneficiaryItem: BeneficiaryModal) => {
          const { payTo, relationshipWithPayee } = beneficiaryItem || {};

          const noPayeeList = lodash.isEmpty(payeeList) || !lodash.isArray(payeeList);

          let beneficiaryTemp = handleBeneficiary(beneficiaryItem, payTo);

          // payee list不存在的时候，若policy benefit的payto存在，但beneficiary的relationshipWithPayee不存在
          // 自动将beneficiary的relationshipWithPayee的值补充为self
          // 根据beneficiary对象人的相关信息生成payee
          if (
            noPayeeList &&
            formUtils.queryValue(beneficiaryItem?.payTo) &&
            !formUtils.queryValue(relationshipWithPayee)
          ) {
            beneficiaryTemp.relationshipWithPayee = ERelationshipWithInsured.Self;
            // 判断与beneficiary的beneficiary name对应的payee是否存在。若不存在则添加一个payee
            if (judgePayeeAdd(getPayeeDicts(tempClaimData.payeeList), beneficiaryTemp)) {
              const result: any = addPayeeMapBeneficiary(tempClaimData, beneficiaryTemp);
              tempClaimData.payeeList = result.payeeList;
              beneficiaryTemp = { ...beneficiaryTemp, ...result.beneficiary };
            }
          }

          beneficiaryTemp = setBeneficiaryVal(tempClaimData.payeeList, beneficiaryTemp);

          return beneficiaryTemp;
        })
        .value();

      return { ...policyBenefit, beneficiaryList: beneficiaries };
    })
    .value();

  tempClaimData.policyBenefitList = tempPolicyBenefitList;

  tempClaimData.payeeList = supplementPayee(tempClaimData.payeeList, submitting);

  return tempClaimData;
};

export default supplementClaimData;
