import { produce }  from 'immer';

const saveSearchAdjustSurgeryInfo = (state: any, action: any) => {
  const { list } = action.payload;
  const nextState = produce(state, (draftState) => {
     draftState.searchAdjustSurgeryInfo = {
       ...draftState.searchAdjustSurgeryInfo,
       ...action.payload,
     };

    // list.forEach((item:any) => {
    //   draftState.searchAdjustSurgeryInfo = {
    //     ...draftState.searchAdjustSurgeryInfo,
    //     ...action.payload,
    //   };
      //  const claimNos = lodash.keys(draftState.searchAdjustSurgeryInfo) || [];
      //  if(lodash.includes(claimNos,item.claimNo)){
      //    draftState.searchAdjustSurgeryInfo = {
      //      ...draftState.searchAdjustSurgeryInfo,
      //      [item.claimNo]: item,
      //    };
      //  }else{
      //    draftState.searchAdjustSurgeryInfo[item.claimNo] = item;

      //  }

    // });
  });

  return { ...nextState };
};

export default saveSearchAdjustSurgeryInfo;
