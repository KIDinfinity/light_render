import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { calculateDate, getPolicyInfoByInsuredId } from '../functions';

const saveIssueAge = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const insured = draftState?.claimProcessData?.insured;
    const { policyList } = draftState?.claimProcessData;
    const insuredInfo = {
      policyId: insured?.policyId,
    };
    const policyInfoList = getPolicyInfoByInsuredId(policyList, insuredInfo);
    const effectiveDate = policyInfoList?.issueEffectiveDate;
    const issueAge = calculateDate(effectiveDate, formUtils.queryValue(insured?.dateOfBirth));
    const tart = issueAge ? { issueAge } : {};
    draftState.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...tart,
    };
  });
  return { ...nextState };
};

export default saveIssueAge;
