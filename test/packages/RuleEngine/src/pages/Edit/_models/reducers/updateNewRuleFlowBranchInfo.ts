import { produce }  from 'immer';
import { OptionType } from '../../NewFlow/Enum';

export default (state: any, action: any) => {
  const { changedFields, flowNodeItem, type } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    switch (type) {
      case OptionType.UPDATE:
        // eslint-disable-next-line no-param-reassign
        draftState.newRulFlow.branchInfo = {
          branchName: flowNodeItem?.branchName || '',
          branchDescription: flowNodeItem?.branchDescription || '',
        };
        break;
      case OptionType.CLEAR:
        // eslint-disable-next-line no-param-reassign
        draftState.newRulFlow.branchInfo = {};
        break;
      default:
        // eslint-disable-next-line no-param-reassign
        draftState.newRulFlow.branchInfo = {
          ...draftState.newRulFlow.branchInfo,
          ...changedFields,
        };
        break;
    }
  });

  return { ...nextState };
};
