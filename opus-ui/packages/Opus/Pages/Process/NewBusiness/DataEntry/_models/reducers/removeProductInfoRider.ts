import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

export default (state, action) => {
  const { id } = action?.payload || {};
  return produce(state, (draftState) => {
    if(id) {
      draftState.processData.productInfoRiders = draftState.processData.productInfoRiders.filter(
        (productInfoRider) => productInfoRider.id !== id
      );
    } else {
      draftState.processData.productInfoRiders = [];
      draftState.processData.productInfoRiders.push({
        id: uuidv4(),
      });
    }
  });
};
