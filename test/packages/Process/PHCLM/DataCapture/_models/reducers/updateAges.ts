import { produce } from 'immer';
import { calcAge } from '@/utils/utils';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state, { payload }) => {
  const { submissionDate } = payload;
  return produce(state, (draftState) => {
    const { insured, policyContractList } = {
      insured: draftState.claimProcessData?.insured,
      policyContractList: draftState.c360PolicyInfo?.policyContractList,
    };

    insured.currentAge = calcAge(insured?.dateOfBirth, submissionDate);
    const effectiveDate = lodash
      .chain(policyContractList)
      .compact()
      .filter(
        (policy: any) => policy.policyId === lodash.toUpper(formUtils.queryValue(insured?.policyId))
      )
      .orderBy('issueEffectiveDate')
      .first()
      .value()?.issueEffectiveDate;
    insured.issueAge = calcAge(formUtils.queryValue(insured?.dateOfBirth), effectiveDate);
  });
};
