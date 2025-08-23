import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* getClaimData({ payload }: any, { select }: any) {
  const { NAMESPACE } = payload;
  const claimData = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas
  );
  const { policyBenefitList, payeeList } = claimData;
  const tempData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData({ policyBenefitList, payeeList })
  );
  lodash.set(claimData, 'payeeList', tempData.payeeList);
  lodash.set(claimData, 'policyBenefitList', tempData.policyBenefitList);

  return claimData;
}
