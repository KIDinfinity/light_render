import lodash from 'lodash';
import { produce }  from 'immer';
import changeBasicInfoFields from './changeBasicInfoFields';
import changePersaonalFieldsCoreLogic from 'process/NB/ManualUnderwriting/utils/fieldsChange/changePersaonalFieldsCoreLogic';

export default (state: any, action: any) => {
  const { changedFields, id } = action.payload;
  let nextState: any = changeBasicInfoFields(state, action);
  if (lodash.size(changedFields) === 1) {
    const businessData = changePersaonalFieldsCoreLogic({
      businessData: nextState.businessData,
      changedFields,
      id,
    });
    nextState = produce(nextState, (draftState: any) => {
      lodash.set(draftState, 'businessData', businessData);
    });
  }
  return {
    ...nextState,
  };
};
