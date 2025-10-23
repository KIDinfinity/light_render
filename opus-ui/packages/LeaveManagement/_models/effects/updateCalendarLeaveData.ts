import { TabActiveStatus, RequestStatus } from '../../Enum';

export default function* (_: any, { put, select }: any) {
  const userLeaveRequestTabName = yield select(
    (state: any) => state.leaveManagement.userLeaveRequestTabName
  );
  const startTime = yield select((state: any) => state.leaveManagement.startTime);
  const endTime = yield select((state: any) => state.leaveManagement.endTime);

  if (userLeaveRequestTabName === TabActiveStatus.personalActive) {
    yield put({
      type: 'getLeaveRequestInfo',
      payload: {
        params: {
          startTime,
          endTime,
          statuses: [RequestStatus.Approved, RequestStatus.WaitingApproval],
        },
      },
    });
  } else if (userLeaveRequestTabName === TabActiveStatus.teamActive) {
    yield put({
      type: 'getTeamLeaveRequestInfo',
      payload: {
        statuses: [RequestStatus.Approved, RequestStatus.WaitingApproval],
      },
    });
  }
}
