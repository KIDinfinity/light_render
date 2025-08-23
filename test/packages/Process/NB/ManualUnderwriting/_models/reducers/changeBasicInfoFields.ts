import { produce }  from 'immer';
import lodash from 'lodash';
import saveDiffCilentInfoList from './saveDiffCilentInfoList';
import changeBasicInfoFieldsCoreLogic from 'process/NB/ManualUnderwriting/utils/fieldsChange/changeBasicInfoFieldsCoreLogic';

export default (state: any, action: any) => {
  const { changedFields: originChangedFields, id } = action?.payload;

  const changedFields = lodash.omit(originChangedFields, ['annualIncomeInLocalCurrency']);
  const businessData = changeBasicInfoFieldsCoreLogic({
    changedFields,
    id,
    businessData: state.businessData,
  });
  let nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData', businessData);
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
