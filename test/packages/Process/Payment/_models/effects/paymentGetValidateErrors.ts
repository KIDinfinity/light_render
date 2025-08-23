import { formUtils } from 'basic/components/Form';

export default function* getValidateErrors(_: any, { select }: any) {
  const { NAMESPACE } = _.payload;
  const claimData = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas
  );

  const { payeeList, policyBenefitList } = claimData;

  return formUtils.getErrorArray({ payeeList, policyBenefitList });
}
