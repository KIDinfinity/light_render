import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import PremiumType from 'process/NB/PremiumSettlement/Enum/premiumType';
import PayType from 'process/NB/PremiumSettlement/Enum/payType';
import { NAMESPACE } from '../../activity.config';

export default function* (_: any, { select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const chequeInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeInfoList
  );
  const policyList = lodash.get(businessData, 'policyList[0]', {});
  const premiumType = lodash.get(businessData, 'premiumType', '');
  const payType = lodash.get(businessData, 'policyList[0].refundPayType', '');

  const finalBusinessData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(businessData)
  );

  if (lodash.isEmpty(finalBusinessData)) {
    return false;
  }
  if (
    !lodash.isEmpty(finalBusinessData) &&
    premiumType === PremiumType.PremiumRefund &&
    payType === PayType.Cheque &&
    lodash.has(policyList, 'bankInfoList')
  ) {
    lodash.set(finalBusinessData, 'policyList[0].bankInfoList', null);
  }
  if (lodash.get(finalBusinessData, 'policyList[0].manualExtendNtu') === 1) {
    lodash.set(finalBusinessData, 'policyList[0].manualExtendNtu', true);
  }
  if (!lodash.isEmpty(chequeInfoList)) {
    lodash.set(finalBusinessData, 'policyList[0].chequeInfoList', chequeInfoList);
  }

  return finalBusinessData;
}
