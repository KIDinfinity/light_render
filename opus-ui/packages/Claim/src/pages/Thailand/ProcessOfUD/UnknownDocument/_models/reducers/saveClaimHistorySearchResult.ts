import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { claimHistorySearchResult, decision: decisionEl, caseNoList } = action.payload;

  const decision = lodash.get(decisionEl, 'value') || decisionEl;
  const nextState = produce(state, (draftState: any) => {
    const isResume = !!(decision && lodash.toLower(decision) === 'resume');
    draftState.claimHistorySearchResult = lodash.sortBy(
      lodash.map(claimHistorySearchResult, (item: any, index: number) => ({
        ...item,
        disabled: !isResume,
        caseNo: caseNoList[index],
      })),
      ['claimNo', 'caseNo']
    );
    if (!isResume) {
      draftState.claimHistorySearchResultRowKeys = [];
    }
  });
  return { ...nextState };
};
