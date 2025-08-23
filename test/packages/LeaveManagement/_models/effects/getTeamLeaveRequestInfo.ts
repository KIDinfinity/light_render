import lodash from 'lodash';
import { getTeamLeaveRequestInfo } from '@/services/userCenterUserLeaveRequestControllerService';

interface IProps {
  payload: {
    beginDate: string;
    endDate: string;
    statuses: string[];
    users: [];
  };
}
export default function* (data: IProps, { call, put, select }: any) {
  const {
    payload: { beginDate, endDate, statuses, users },
  } = data;

  let response = {};

  if (!beginDate || !endDate || !users) {
    const startDate = yield select((state: any) => state.leaveManagement.beginDate);
    const overDate = yield select((state: any) => state.leaveManagement.endDate);
    const currentUsers = yield select((state: any) => state.leaveManagement.currentUsers);

    response = yield call(getTeamLeaveRequestInfo, {
      beginDate: startDate,
      endDate: overDate,
      users: currentUsers,
      statuses,
    });
  } else if (!lodash.isEmpty(users) && !lodash.isEmpty(beginDate) && !lodash.isEmpty(endDate)) {
    response = yield call(getTeamLeaveRequestInfo, {
      beginDate,
      endDate,
      users,
      statuses,
    });
  }

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isArray(response.resultData) &&
    !lodash.isEmpty(response.resultData)
  ) {
    // 按照日期分类
    const result = lodash.reduce(
      response.resultData,
      (targets, item) => {
        const { date, teamUserLeaveRequestInfoVOList } = item;

        // 按照不同status分类
        const newLeaveList = lodash.reduce(
          teamUserLeaveRequestInfoVOList,
          (totalList, part) => {
            if (!part.status) {
              return totalList;
            }

            if (lodash.isEmpty(totalList[part.status])) {
              // eslint-disable-next-line no-param-reassign
              totalList[part.status] = [];
            }

            totalList[part.status].push(part);
            return totalList;
          },
          {}
        );

        return { ...targets, [`${date}`]: newLeaveList };
      },
      []
    );

    yield put({
      type: 'saveUserLeaveInfo',
      payload: {
        userLeaveInfo: result,
      },
    });
  }
}
