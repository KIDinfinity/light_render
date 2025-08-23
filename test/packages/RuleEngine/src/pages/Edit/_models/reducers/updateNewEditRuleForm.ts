import { produce }  from 'immer';
import lodash from 'lodash';

const updateNewEditRuleForm = (state: any, action: any) => {
  const { id, type, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      // eslint-disable-next-line no-param-reassign
      const idx = lodash.findIndex(draftState.editData[type] || [], { id });

      draftState.editData[type][idx] = {
        ...draftState.editData[type][idx],
        ...changedFields,
        value: '',
        valueParam: '',
        valueDomain: '',
        valueName: '',
        comparisonValueType: 'F',
      };
    }
  });

  return { ...nextState };
};

export default updateNewEditRuleForm;
