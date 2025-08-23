import { produce } from 'immer';
import { sortBy } from 'lodash';

export default (state: any, action: any) => {
  const { searchResult = [] } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.searchResult = sortBy(searchResult, 'identityId');
    draftState.searchResultRowKeys = [];
    if (searchResult.length === 0) {
      draftState.claimHistorySearchResult = [];
      draftState.claimHistorySearchResultRowKeys = [];
    }
  });
  return { ...nextState };
};
