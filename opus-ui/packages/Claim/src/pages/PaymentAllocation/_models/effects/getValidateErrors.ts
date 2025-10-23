import { formUtils } from 'basic/components/Form';

export default function* getValidateErrors(_: any, { select }: any) {
  const claimData = yield select(({ paymentAllocation }: any) => paymentAllocation.claimData);

  const { payeeList, policyBenefitList } = claimData;

  return formUtils.getErrorArray({ payeeList, policyBenefitList });
}
