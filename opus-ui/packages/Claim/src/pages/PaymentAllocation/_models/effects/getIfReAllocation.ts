import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getClaimPayableCompare } from '../../_function';

export default function* getIfReAllocation({ payload }: any, { select }: any) {
  const { claimData } = payload;

  const reClaimData = yield select(({ paymentAllocation }: any) => paymentAllocation.claimData);

  const claimDataN: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimData));
  const claimDataO: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(reClaimData));
  const { claimPayableList: claimPayableListN } = claimDataN;
  const { claimPayableList: claimPayableListO } = claimDataO;
  return lodash.isEqual(
    getClaimPayableCompare(claimPayableListN),
    getClaimPayableCompare(claimPayableListO)
  );
}
