import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getClaimPayableCompare } from '../../_function';
import getClaimExchangeRateCompare from '../../_function/getClaimExchangeRateCompare';

export default function* getIfReAllocation({ payload }: any, { select }: any) {
  const { claimData } = payload;

  const reClaimData = yield select(({ paymentAllocation }: any) => paymentAllocation.claimData);

  const claimDataN: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimData));
  const claimDataO: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(reClaimData));
  const { claimPayableList: claimPayableListN, claimDecision: claimDecisionN } = claimDataN;
  const { claimPayableList: claimPayableListO, claimDecision: claimDecisionO } = claimDataO;
  const isClaimDecisionExchangeRateSame = lodash.isEqual(
    getClaimExchangeRateCompare(claimDecisionN?.exchangeRateRecord),
    getClaimExchangeRateCompare(claimDecisionO?.exchangeRateRecord)
  );

  const isClaimPayableSame = lodash.isEqual(
    getClaimPayableCompare(claimPayableListN),
    getClaimPayableCompare(claimPayableListO)
  );

  return isClaimPayableSame && isClaimDecisionExchangeRateSame;
}
