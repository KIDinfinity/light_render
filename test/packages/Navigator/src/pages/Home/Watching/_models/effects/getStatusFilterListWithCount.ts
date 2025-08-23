import lodash from 'lodash';
import dcHomePageCaseDataCallService from '@/services/dcHomePageCaseDataCallService';
import filterName from '../funcitons/filterName';
import { TaskFilterEnum } from '../../Enum';

export default function* getStatusFilterListWithCount(
  { signal = null }: any,
  { put, call, select }: any
): Generator<any, any, any> {
  const userId: string = yield select((state: any) => state.user.currentUser.userId || '');
  const selectedFolder: any[] = yield select(
    ({ taskFolder }: any) => taskFolder.selectedFolder || []
  );

  const response: any = yield call(
    dcHomePageCaseDataCallService.countTaskByStatus,
    {
      userId,
    },
    { signal }
  );

  const unassignResponse: any = yield call(
    dcHomePageCaseDataCallService.unassign,
    {
      params: {
        assignee: 'unassigned',
        taskStatus: 'todo',
      },
    },
    { signal }
  );

  if (
    lodash.isPlainObject(response) &&
    response?.success &&
    lodash.isArray(response?.resultData) &&
    !lodash.isEmpty(response?.resultData)
  ) {
    let statusFilterList = Array.from(selectedFolder); // 这样写的原因是不污染原数据
    // 交换位置
    if (
      statusFilterList.includes(TaskFilterEnum.Completed) &&
      statusFilterList.includes(TaskFilterEnum.Favorite)
    ) {
      const indexOfCompleted = lodash.indexOf(statusFilterList, TaskFilterEnum.Completed);
      const indexOfFavorite = lodash.indexOf(statusFilterList, TaskFilterEnum.Favorite);
      if (indexOfCompleted > indexOfFavorite) {
        [statusFilterList[indexOfFavorite], statusFilterList[indexOfCompleted]] = [
          statusFilterList[indexOfCompleted],
          statusFilterList[indexOfFavorite],
        ];
      }
    }

    if (statusFilterList.includes(TaskFilterEnum.Unassigned)) {
      statusFilterList = lodash.remove(
        statusFilterList,
        (item: any) => item !== TaskFilterEnum.Unassigned
      );
      statusFilterList.push(TaskFilterEnum.Unassigned);
    }

    response.resultData.find(
      (item: any) => lodash.toLower(item.status) === lodash.toLower(TaskFilterEnum.Unassigned)
    ).count = unassignResponse?.resultData?.total ?? 0;

    statusFilterList = lodash
      .chain(statusFilterList)
      .map((status: string) => ({
        ...lodash.find(
          response.resultData,
          (item: any) => lodash.toLower(item.status) === lodash.toLower(status)
        ),
        status: lodash.toLower(status),
        name: filterName(lodash.toLower(status)),
      }))
      .compact()
      .value();

    yield put({
      type: 'saveStatusFilterList',
      payload: {
        statusFilterList,
      },
    });
  }
  yield put({
    type: 'saveFirstLoading',
    payload: {
      firstLoading: false,
    },
  });
}
