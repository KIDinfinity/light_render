import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const { curGroupCode, curCategoryCode } = lodash.get(action, 'payload', {});
  const nextState = produce(state, (draftState: any) => {
    if (curGroupCode || lodash.isEmpty(action.payload)) {
      const gcode = curGroupCode || lodash.get(state, `groupCodes[0].infoGroupCode`, '');

      draftState.curGroupCode = gcode;
      draftState.curCategoryCode = lodash.get(
        state,
        `informationGroups.${gcode}.caseCategorylist[0].infoCategoryCode`,
        ''
      );
    }
    if (curCategoryCode) {
      draftState.curCategoryCode = curCategoryCode;
    }
  });
  return {
    ...nextState,
  };
};
