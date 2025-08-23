import lodash from 'lodash';

export default function* ({ payload }: any, { put, select }: any) {
  const { sortOrders, currentPage } = payload;
  const { listPage } = yield select((state: any) => ({
    listPage: state.configureUserController.listPage,
  }));
  const sortNameArray = lodash.map(sortOrders, (item) => item.sortName);
  const sortOrderArray = lodash.map(sortOrders, (item) => item.sortOrder);
  const newRows = lodash.orderBy(listPage?.rows, sortNameArray, sortOrderArray);
  yield put({
    type: 'saveListPage',
    payload: {
      listPage: {
        ...listPage,
        rows: newRows,
        currentPage,
      },
    },
  });
}
