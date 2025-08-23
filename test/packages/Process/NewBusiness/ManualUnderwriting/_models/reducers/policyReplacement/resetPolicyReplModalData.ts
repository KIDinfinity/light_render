import { produce } from 'immer';
import { filterShowReplacementInfo } from 'process/NewBusiness/ManualUnderwriting/Pages/PolicyReplacement/utils';
import { v4 as uuid } from 'uuid';

export default (state: any) => {
  const filteredPolicyReplacement = {
    ...state?.processData?.policyReplacement,
    replacementInfoList: [
      ...(state?.processData?.policyReplacement?.replacementInfoList?.filter(
        filterShowReplacementInfo
      ) || []),
      {
        id: uuid(),
        isLast: true,
      },
    ],
  };
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.policyReplacement = filteredPolicyReplacement;
  });
  return { ...nextState };
};
