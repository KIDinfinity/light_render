import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* getClaimData(_: any, { select }: any) {
  const claimData = yield select(({ paymentAllocation }: any) => paymentAllocation.claimData);
  const { policyBenefitList, payeeList } = claimData;
  const tempData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData({ policyBenefitList, payeeList })
  );
  lodash.set(claimData, 'payeeList', tempData.payeeList);
  lodash.set(claimData, 'policyBenefitList', tempData.policyBenefitList);

  return claimData;
}
