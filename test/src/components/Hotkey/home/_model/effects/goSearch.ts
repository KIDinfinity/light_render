import { history } from 'umi';

function* goSearch(_: any, { select, put }: any) {
  const mode = yield select(
    (state: { navigatorHomeWatching: { mode: any } }) => state.navigatorHomeWatching.mode
  );
  const params = yield select(
    (state: { homeTaskFlow: { params: any } }) => state.homeTaskFlow.params
  );
  const filter = yield select((state: { homeList: any[] }) => state.homeList.filter);
  const caseCategory = yield select(
    (state: { homeTaskFlow: { currentCaseCategory: { caseCategory: any } } }) =>
      state.homeTaskFlow.currentCaseCategory.caseCategory
  );

  yield put({
    type: 'advancedQueryController/initStateOfSearch',
  });

  const extraParams =
    filter === 'unassigned'
      ? {
          assignee: 'unassigned',
        }
      : {
          taskStatus: filter,
        };

  history.push(
    {
      pathname: '/navigator/advancedquery',
    }, {
      ...params,
      mode,
      tabIndex: '2',
      ...extraParams,
      caseCategory,
      saveStateOfSearch: true,
    }
  );
}

export default goSearch;
