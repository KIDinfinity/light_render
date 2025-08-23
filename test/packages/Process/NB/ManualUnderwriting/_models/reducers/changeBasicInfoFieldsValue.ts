import { produce }  from 'immer';
import lodash from 'lodash';
import saveDiffCilentInfoList from './saveDiffCilentInfoList';
import changeBasicInfoFieldsCoreLogic from 'process/NB/ManualUnderwriting/utils/fieldsChange/changeBasicInfoFieldsCoreLogic';

export default (state: any, action: any) => {
  const { changedFields, id } = action?.payload;
  const businessData = changeBasicInfoFieldsCoreLogic({
    changedFields,
    id,
    businessData: state.businessDataValue,
  });
  let nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessDataValue', businessData);
    lodash.set(draftState, 'stepsChange.ClientInfo', true);
  });
  nextState = saveDiffCilentInfoList(nextState, {
    payload: {
      preState: state,
      id,
    },
  });

  return {
    ...nextState,
  };
};
