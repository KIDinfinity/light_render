import lodash from 'lodash';
import { produce } from 'immer';

const removeApplicationItem = (state: any, action: any) => {
  const { applicationId } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.applicationList = lodash.filter(
      draftState.claimProcessData.applicationList,
      (item) => item !== applicationId
    );
    delete draftState.claimEntities.applicationListMap[applicationId];
    lodash.map(draftState.claimProcessData.applicationList, (itemId, index) => {
      draftState.claimEntities.applicationListMap[itemId].applicationNo = (index + 1)
        .toString()
        .padStart(3, '0');
    });
  });

  return { ...nextState };
};

export default removeApplicationItem;
