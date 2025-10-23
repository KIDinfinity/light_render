import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from '../../activity.config';
import PayType from '../../Enum/payType';
import BankdInfoType from '../../../Enum/BankInfoType';
import PremiumType from '../../Enum/premiumType';

export default function* validateBankInfo(_, { select }: any): Generator<any, any, any> {
  const premiumType = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.businessData?.premiumType
  );
  const refundPayType = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace.businessData?.policyList?.[0]?.refundPayType
  );
  const bankInfoList = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace.businessData?.policyList?.[0]?.bankInfoList
  );

  if (
    formUtils.queryValue(refundPayType) !== PayType.BankTransfer ||
    formUtils.queryValue(premiumType) === PremiumType.PremiumCollection
  ) {
    return true;
  }

  return lodash.some(
    bankInfoList,
    (item: any) =>
      formUtils.queryValue(item.type) === BankdInfoType.Withdrawal &&
      formUtils.queryValue(item.bankAcctNo) // 避免出现后端返回的错误空数据
  );
}
