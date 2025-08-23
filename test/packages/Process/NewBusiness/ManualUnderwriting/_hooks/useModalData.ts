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
    id: string;
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
interface IModalData {
  policyReplacement: IPolicyReplacement;
  takeOver: any;
  agentList: any[];
}
export default function useModalData() {
  return useSelector<Record<string, { modalData: IModalData }>, IModalData | undefined>(
    ({ [NAMESPACE]: namespaceModel }) => namespaceModel.modalData
  );
}
