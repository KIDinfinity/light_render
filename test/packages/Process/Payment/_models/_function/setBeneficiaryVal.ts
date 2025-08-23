import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PayeeModal, BeneficiaryModal } from '../_dto/Models';
import { ERelationshipWithInsured } from '../_dto/Enums';
import { nameIsEqual, getBeneficiaryName } from '.';
/**
 * 去掉所有空字符后，转为小写比较字符串（常用于比较两个名字是否是同一个人）
 * @param prevName
 * @param nextName
 */
const setBeneficiaryVal = (payeeList: PayeeModal[], beneficiaryItem: BeneficiaryModal) => {
  if (lodash.isEmpty(payeeList) || lodash.isEmpty(beneficiaryItem)) return beneficiaryItem;

  const beneficiaryTemp = { ...beneficiaryItem };
  const { payeeId, firstName, surname } = beneficiaryTemp;
  const payeeIdVal = formUtils.queryValue(payeeId);
  const hasPayeeList = lodash.isArray(payeeList) && !lodash.isEmpty(payeeList);
  if (hasPayeeList && payeeIdVal) {
    const payeeTemp: any = lodash.find(payeeList, { id: payeeIdVal });
    const { firstName: payeeFirstName, surname: payeeSurname } = payeeTemp || {};

    if (
      nameIsEqual(
        getBeneficiaryName(firstName, surname),
        getBeneficiaryName(payeeFirstName, payeeSurname)
      )
    ) {
      beneficiaryTemp.relationshipWithPayee = ERelationshipWithInsured.Self;
    } else {
      beneficiaryTemp.relationshipWithPayee = ERelationshipWithInsured.Others;
    }
  }

  return beneficiaryTemp;
};

export default setBeneficiaryVal;
