import { produce } from 'immer';

export default (state,action) => {
  const { index } = action?.payload || {};

  return produce(state, (draftState) => {
    if(index >= 0) {
      draftState.processData.productInfoRiders[index].premiumRider = null;
      draftState.processData.productInfoRiders[index].classes = null;
      draftState.processData.productInfoRiders[index].sumAssuredRider = null;
    } else {
      draftState.processData.productInfoRiders = draftState.processData.productInfoRiders?.map((item) => { 
        return { id: item.id };
      }); 
    }
  });
};
