import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  return produce(state, draftState => {
    if(lodash.size(changedFields) === 1 && changedFields.proportion) {
      if(formUtils.queryValue(changedFields.proportion) !== '50') {
        changedFields.coagentCode = void 0;
        changedFields.coagentName = void 0;
        changedFields.coAgentProportion = void 0;
      } else {
        changedFields.coAgentProportion = 50
      }
    }
    formUtils.saveChangedFields({ baseObject: draftState.processData, path: 'agentInfo', changedFields});
  })
}