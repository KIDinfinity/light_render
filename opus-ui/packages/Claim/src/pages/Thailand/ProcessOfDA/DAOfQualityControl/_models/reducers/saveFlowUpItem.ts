import lodash from 'lodash';
import { produce } from 'immer';

const saveFlowUpItem = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const inquiryClaimNo = lodash.get(state, 'claimProcessData.inquiryClaimNo');
    const followUpInquiryNoClaimList = lodash.get(
      draftState,
      'claimProcessData.followUpInquiryNoClaimList'
    );
    const { value, checked, confinementClaim } = action.payload;
    let newFollowUpInquiryNoClaimList: any = [];
    if (checked) {
      newFollowUpInquiryNoClaimList = lodash.compact(followUpInquiryNoClaimList).concat([
        {
          inquiryClaimNo,
          relatedInquiryClaimNo: value,
          relationType: 1,
          confinementClaim,
        },
      ]);
    } else {
      lodash.remove(
        followUpInquiryNoClaimList,
        (item: any) => item.relatedInquiryClaimNo === value
      );
      newFollowUpInquiryNoClaimList = followUpInquiryNoClaimList;
    }

    draftState.claimProcessData.followUpInquiryNoClaimList = [...newFollowUpInquiryNoClaimList];
  });

  return {
    ...nextState,
  };
};

export default saveFlowUpItem;
