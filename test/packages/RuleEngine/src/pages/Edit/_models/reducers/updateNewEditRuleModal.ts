import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

// TODO:右边的value需要单独处理
const updateNewEditRuleModal = (state: any, action: any) => {
  const { item, type } = action.payload;

  const {
    id,
    atomCode,
    value = '',
    atomParam = '',
    valueParam = '',
    atomDomain = '',
    valueDomain = '',
    atomType = '',
    atomFlag = '',
    valueName = '',
    comparisonValueType = 'F',
    allowFreeText = 'N',
  } = formUtils.cleanValidateData(item);

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.editData.judgementMethod = '01';
    const idx = lodash.findIndex(draftState.editData[type], { id });

    draftState.editData[type][idx] = {
      id,
      atomCode,
      value,
      valueName,
      atomParam,
      valueParam,
      atomDomain,
      valueDomain,
      atomType,
      atomFlag,
      comparisonValueType,
      operator: formUtils.queryValue(item.operator) || '',
      allowFreeText,
    };
  });

  return { ...nextState };
};

export default updateNewEditRuleModal;
