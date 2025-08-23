import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveFormData = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const newInfo = {
      ...draftState.submitRuleSet?.ruleSetInfo,
      ...changedFields,
    };

    const moduleCode = formUtils.queryValue(changedFields?.moduleCode);
    if (moduleCode) {
      const modulePrefix = lodash
        .chain(state)
        .get('dropDown.ruleModules')
        .find({ moduleCode })
        .get('prefix')
        .value();
      newInfo.modulePrefix = modulePrefix;
    }

    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.ruleSetInfo = newInfo;
  });

  return { ...nextState };
};

export default saveFormData;
