import { produce } from 'immer';

const followUpTaskAdd = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    if (!draftState?.businessData?.followUpInfoList) {
      draftState.businessData = { ...draftState.businessData, followUpInfoList: [] };
    }

    const newArr = [
      ...draftState?.businessData?.followUpInfoList,
      {
        itemNo: (draftState.businessData?.followUpInfoList?.length || 0) + 1,
        taskCompletionDate: null,
        followUpTask: null,
        // claimNo:
        //   draftState.businessData?.claimNo ??
        //   draftState?.taskDetail?.businessNo ??
        //   draftState?.businessData?.claimDecision?.hostClaimNo ??
        //   '',
      },
    ];

    draftState.businessData.followUpInfoList = newArr;
  });

  return { ...nextState };
};

export default followUpTaskAdd;
