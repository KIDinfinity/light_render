import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const decision =
      lodash.get(changedFields, 'decision.value') || lodash.get(changedFields, 'decision');

    if (decision) {
      const isResume = !!(decision && lodash.toLower(decision) === 'resume');
      draftState.claimHistorySearchResult = lodash.map(
        draftState.claimHistorySearchResult,
        (item: any) => ({
          ...item,
          disabled: !isResume,
        })
      );

      if (!isResume) {
        draftState.claimHistorySearchResultRowKeys = [];
      }
    }

    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      ...changedFields,
    };
  });
  return { ...nextState };
};
