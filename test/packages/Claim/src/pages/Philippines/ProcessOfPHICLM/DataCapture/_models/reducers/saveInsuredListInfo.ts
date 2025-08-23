import { produce } from 'immer';
import lodash from 'lodash';


const saveInsuredListInfo = (state: any, { payload }: any) => {
  const claimData = lodash.keys(payload);
  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(claimData, key => {
      draftState.claimProcessData[key] = payload?.[key]
    })

  })
  return { ...nextState }
};

export default saveInsuredListInfo;
