import lodash from 'lodash';
import { cleanStrSpace, nameIsEqual, getBeneficiaryName } from '.';

/**
 * 判断是否添加payee信息
 * @param payeeDicts payee的下拉项
 * @param beneficiaryItem 受益人数据对象
 */
const judgePayeeAdd = (payeeDicts: any[], beneficiaryItem: any = {}) => {
  const { firstName, surname } = beneficiaryItem;
  const beneficiary = cleanStrSpace(getBeneficiaryName(firstName, surname));
  // 如果beneficiary值不存在则不添加payee
  if (!beneficiary) return false;

  // 如果存在和beneficiary相同的值则不添加payee
  return !lodash
    .chain(payeeDicts)
    .some((payeeDict: any) => nameIsEqual(beneficiary, payeeDict?.dictName))
    .value();
};

export default judgePayeeAdd;
