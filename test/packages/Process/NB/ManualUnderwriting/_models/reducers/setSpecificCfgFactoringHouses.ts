import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const specificCfgFactoringHouseList = lodash.get(
    action,
    'payload.specificCfgFactoringHouses',
    []
  );
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'specificCfgFactoringHouseList', specificCfgFactoringHouseList);
  });
  return {
    ...nextState,
  };
};
