import { getAssigneeTaskSummary } from '@/services/bpmCommonControllerService';
import { getLeaveDuration } from '@/services/userCenterUserLeaveControllerService';
import {
  findLeavePage,
  findTaskCountMemberList,
} from '@/services/userCenterUserLeaveRequestControllerService';
import lodash from 'lodash';
import moment from 'moment';
import nameSpace from '../nameSpace';

export default {
  getLeaveTable: [
    function* getLeaveTable(
      { payload }: any,
      { put, select, call }: any
    ): Generator<any, any, any> {
      const userId = yield select(({ user }: any) => user?.currentUser?.userId) || '';
      const { currentPage: newCurrentPage } = payload || {};
      const leaveTableParams = yield select(
        ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.leaveTableParams
      );

      const { currentPage, pageSize, leaveRange } = leaveTableParams || {};

      // 没填完整时清空列表
      if (!leaveRange?.[0] || !leaveRange?.[1]) {
        yield put({
          type: 'saveLeaveTable',
          payload: {
            leaveTableData: {
              currentPage: 1,
              pageSize: 10,
              params: {},
              rows: [],
              total: 0,
            },
          },
        });

        return;
      }

      const response = yield call(findLeavePage, {
        currentPage: newCurrentPage || currentPage,
        pageSize,
        params: {
          userId,
          startDate: moment(leaveRange[0]).format(),
          endDate: moment(leaveRange[1]).format(),
        },
      });

      if (lodash.isPlainObject(response) && !!response?.success) {
        yield put({
          type: 'saveLeaveTable',
          payload: {
            leaveTableData: response?.resultData,
          },
        });
      }
    },
    { type: 'takeLatest' },
  ],
  *getOrganizationMemberList(_: any, { put, select, call }: any): Generator<any, void, any> {
    const organizationList = yield select(({ opusHome }: any) => opusHome.organizationList);
    const isMember = yield select(({ opusHome }: any) => opusHome.isMember);
    const userId = yield select(({ user }: any) => user?.currentUser?.userId) || '';
    const userName = yield select(({ user }: any) => user?.currentUser?.userName) || '';
    if (isMember) {
      const response = yield call(getAssigneeTaskSummary, [userId]);
      if (lodash.isPlainObject(response) && !!response?.success) {
        yield put({
          type: 'saveOrganizationMemberList',
          payload: {
            organizationMemberList: [
              {
                userId,
                userName,
                todoTaskCount: response?.resultData?.[0]?.todoTaskCount,
              },
            ],
          },
        });
      }
      return;
    }
    const response = yield call(
      findTaskCountMemberList,
      lodash.map(organizationList, 'organizationCode')
    );

    if (lodash.isPlainObject(response) && !!response?.success) {
      yield put({
        type: 'saveOrganizationMemberList',
        payload: {
          organizationMemberList: response?.resultData,
        },
      });
    }
  },
  *initAddLeaveForm(_: any, { put, select }: any): Generator<any, void, any> {
    const isMember = yield select(({ opusHome }: any) => opusHome.isMember);
    const userId = yield select(({ user }: any) => user?.currentUser?.userId) || '';
    const initAddLeaveForm: any = {
      teamMember: isMember ? userId : undefined,
      leaveLength: undefined,
      leaveStartDate: null,
      leaveEndDate: null,
      leaveType: undefined,
      dailyQuantity: '',
    };
    yield put({
      type: 'saveAddLeaveForm',
      payload: { changedValues: initAddLeaveForm },
    });

    yield put({
      type: 'calculateDuration',
      payload: {
        leaveLength: initAddLeaveForm.leaveLength,
        leaveStartDate: initAddLeaveForm.leaveStartDate,
        leaveEndDate: initAddLeaveForm.leaveEndDate,
      },
    });
  },
  *calculateDuration({ payload }: any, { put, call }: any): Generator<any, void, any> {
    const { leaveLength, leaveStartDate, leaveEndDate, isEdit = false } = payload;

    if (!leaveStartDate || !leaveEndDate) {
      yield put({
        type: isEdit ? 'saveEditLeaveForm' : 'saveAddLeaveForm',
        payload: {
          changedValues: {
            dailyQuantity: 0,
          },
        },
      });

      return;
    }

    const response = yield call(getLeaveDuration, {
      startTime: moment(leaveStartDate).startOf('day').format('YYYY-MM-DD HH:mm:SS'),
      endTime: moment(leaveEndDate).startOf('day').format('YYYY-MM-DD HH:mm:SS'),
      leaveLength,
    });

    if (!!response?.success) {
      const dailyQuantity = response?.resultData;
      yield put({
        type: isEdit ? 'saveEditLeaveForm' : 'saveAddLeaveForm',
        payload: {
          changedValues: {
            dailyQuantity,
          },
        },
      });
    }
  },
  *initEditLeaveForm({ payload }: any, { put, select }: any): Generator<any, void, any> {
    const { row } = payload;
    const { userId, leaveLength, leaveType, startTime, endTime } = row || {};
    const initEditLeaveForm = {
      teamMember: userId,
      leaveType: leaveType,
      leaveLength: leaveLength,
      leaveStartDate: moment(startTime),
      leaveEndDate: moment(endTime),
      dailyQuantity: '',
    };
    yield put({
      type: 'saveEditLeaveForm',
      payload: { changedValues: initEditLeaveForm },
    });

    yield put({
      type: 'calculateDuration',
      payload: {
        leaveLength: initEditLeaveForm.leaveLength,
        leaveStartDate: initEditLeaveForm.leaveStartDate,
        leaveEndDate: initEditLeaveForm.leaveEndDate,
        isEdit: true,
      },
    });
  },
};
