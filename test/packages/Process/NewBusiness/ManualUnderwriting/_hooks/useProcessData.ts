import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
interface IPolicyReplacement {
  policyReplacementFlag?: string;
  gsIndicator?: string;
  replacementFirstInfo?: {
    paidByPolicyLoan?: any;
    replaceInforce?: any;
    inforcePolicy?: any;
    reinstatablePolicy?: any;
    replaceWithApplyFor?: any;
  };
  replacementLastInfo?: {
    comment?: any;
    partyInfluence?: any;
    satisfiedExplanation?: any;
    extensionToExistingProduct?: any;
  };
  replacementInfoList?: {
    insuredSeqNo?: any;
    policyType?: any;
    sumAssured?: any;
    insuranceCompanyName?: any;
    reasonForPolicyReplacement?: any;
    otherReason?: any;
    insurerName?: any;
    planName?: any;
    replacedPolicyId?: any;
  }[];
}
interface IProcessData {
  applicationNo?: string;
  policyReplacement: IPolicyReplacement;
  takeOver: any;
  agentList: any[];
}
export default function useProcessData() {
  return useSelector<Record<string, { processData: IProcessData }>, IProcessData>(
    ({ [NAMESPACE]: namespaceModel }) =>
      namespaceModel?.processData || {
        policyReplacement: {
          policyReplacementFlag: 'N',
          replacementFirstInfo: {},
          replacementLastInfo: {},
          replacementInfoList: [],
        },
      }
  );
}
