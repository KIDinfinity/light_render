import { produce }  from 'immer';
import lodash from 'lodash';

const savePartyListInfo = (state: any, { payload }: any) => {
  const data = lodash.keys(payload)
  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(data, key => {
      draftState[key] = payload?.[key]
    })
  })
  return { ...nextState }
};

export default savePartyListInfo;
