import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PayeeModal } from '../_dto/Models';
import { getBeneficiaryName } from '.';
/**
 * 过滤用户在UI界面新增的数据
 * @param payeeList 需要过滤的数据
 */
const getPayeeDicts = (payeeList?: PayeeModal[]) => {
  if (lodash.isEmpty(payeeList)) return [];

  return lodash
    .chain(payeeList)
    .compact()
    .filter(
      (payeeItem: PayeeModal) =>
        !!formUtils.queryValue(payeeItem?.firstName) || !!formUtils.queryValue(payeeItem?.surname)
    )
    .map((payeeItem: PayeeModal) => ({
      dictCode: payeeItem.id,
      dictName: getBeneficiaryName(payeeItem?.firstName, payeeItem?.surname),
    }))
    .value();
};

export default getPayeeDicts;
