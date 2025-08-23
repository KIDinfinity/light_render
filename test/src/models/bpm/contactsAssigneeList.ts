import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import rbac2PermissionLimitControllerService from '@/services/rbac2PermissionLimitControllerService';
import { getAssigneeByGroup } from '@/services/autoRuleCallService';
import { getDocSize } from '@/utils/utils';

const compareStr = (strA: string, strB: string): boolean =>
  strA.toLowerCase() === strB.toLowerCase();

export default {
  namespace: 'contactsAssigneeList',

  state: {
    isAssigneeListVisible: false,
    assigneeList: [],
    matchUserGroupList: [],
    taskDetail: [],
    ProviderSetTaskId: null,
    assigneeFlag: 0,
    // 保存拖拽Assign的来源{首页table模式：0，首页card模式：1，高级查询的table和flow模式：2，高级查询的card模式：3，taskDetail 页面打开: 5}
    assignSourceType: null,
    reAssign: {},
  },

  effects: {
    *getAssigneeList({ payload }, { call, put }) {
      const { taskDetail } = payload;
      const activityKey = taskDetail?.activityKey;
      const caseCategory = taskDetail?.caseCategory;

      // 获取通讯录列表
      const getPromise = yield put({
        type: 'userContactController/get',
        payload: {
          contacts: 'contacts',
        },
      });

      // 获取可以assign的数据
      const assigneeParam = objectToFormData({
        caseCategory,
        activityKey,
        businessNo: taskDetail?.businessNo,
      });

      const [{ resultData: contactList }, response] = yield call(() =>
        Promise.all([getPromise, bpmProcessTaskService.listAssigneesQuery(assigneeParam)])
      );

      const assigneeList = response?.resultData;
      const matchUserGroupList = assigneeList?.userGroupInfoList?.[0]?.matchUserGroupList || [];
      const newAssignList = assigneeList?.havePermissionUserInfoList;

      const statusOrder = [2, 0, 3, 1];
      matchUserGroupList.map((group) =>
        group?.userContactList?.sort((a, b) => {
          const relativeStatus =
            statusOrder.indexOf(Number(a.status) || 0) - statusOrder.indexOf(Number(b.status) || 0);
          if (relativeStatus !== 0) return relativeStatus;

          const byNum = a.taskNum - b.taskNum;
          if (byNum !== 0) return byNum;

          return b.userName - a.userName;
        })
      );

      const userInGroup = matchUserGroupList?.map((group) => group?.userContactList || [])?.flat();
      // 整合通讯录跟可以assignee的数据
      const mergedAssigneeList = lodash.filter(contactList, (item) => {
        if (userInGroup?.some((aItem) => compareStr(aItem.userId, item.userId))) {
          return false;
        }
        lodash.find(newAssignList, (aItem) => {
          if (compareStr(item.userId, aItem.userId)) {
            item.taskNum = aItem.taskNum;
            item.isAssignee = true;
            return true;
          }
        });
        return true;
      });

      yield put({
        type: 'save',
        payload: {
          assigneeList: mergedAssigneeList,
          matchUserGroupList,
        },
      });
    },
    *getTargetAssignee({ payload }, { call, select }) {
      const { group } = payload;
      const { activityKey, caseCategory, businessNo, taskId, caseNo, procInstId } = yield select(
        (state) => state.contactsAssigneeList.taskDetail || {}
      );

      const userIdList = group.userContactList.map((user) => user?.userId);
      const assignUserGroup = {
        ...group,
        userContactList: void 0,
        userIdList,
      };
      const result = yield call(getAssigneeByGroup, {
        assignUserGroup,
        activityKey,
        caseCategory,
        businessNo,
        taskId,
        caseNo: caseNo || procInstId,
      });
      if (result?.resultData) {
        const contactList = yield select((state) => state.userContactController.contactList);
        return contactList.find((user) => compareStr(user.userId, result.resultData));
      }
    },
    *assignTask({ payload }, { call, put }) {
      const { assignee, assigner, taskId, caseCategory, assignType } = payload;

      const response = yield call(bpmProcessTaskService.assignTask, {
        assignee,
        assigner,
        taskId,
        caseCategory,
        assignType,
      });

      if (response?.success === true) {
        yield put({
          type: 'saveReAssign',
          payload: {
            reassign: {
              [taskId]: assignee,
            },
          },
        });
      }

      return response;
    },
    *openAssigneeList({ payload }, { put }) {
      const { taskDetail } = payload;

      // 打开drawer
      yield put({
        type: 'workspaceSwitchOn/changeSwitch',
        payload: {
          name: 'chat',
        },
      });

      // 打开聊天室的通讯录
      yield put({
        type: 'chatController/changeCurrentTab',
        payload: {
          currentTab: '2',
        },
      });

      // 展示可以assignee通讯录列表
      yield put({
        type: 'openAssigneeListReducers',
      });

      // 保存 task 信息
      yield put({
        type: 'save',
        payload: {
          taskDetail,
        },
      });
    },

    *closeAssigneeList(_, { put }) {
      // 关闭drawer
      yield put({
        type: 'workspaceSwitchOn/closeSwitch',
      });

      // 展示可以assignee通讯录列表
      yield put({
        type: 'closeAssigneeListReducers',
      });
    },

    *beManualAssignPermissionLimit({ payload }, { call }) {
      const { ManualAssignPermission } = payload;
      const response = yield call(
        rbac2PermissionLimitControllerService.beManualAssignPermissionLimit,
        ManualAssignPermission
      );

      return response.success;
    },
    *changeSwitchListener(_: any, { select, takeLatest, put }: any) {
      yield takeLatest('workspaceSwitchOn/changeSwitch', function* action({ payload }: any) {
        const isAssigneeListVisible = yield select(
          (state) => state.contactsAssigneeList?.isAssigneeListVisible
        );

        if (isAssigneeListVisible && payload.name !== 'chat') {
          yield put({
            type: 'closeAssigneeListReducers',
          });
        }
      });
    },
    *historyListener(_: any, { select, put }: any) {
      const isAssigneeListVisible = yield select(
        (state) => state.contactsAssigneeList?.isAssigneeListVisible
      );

      if (isAssigneeListVisible) {
        yield put({
          type: 'closeAssigneeListReducers',
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      const { payload } = action;
      for (const key in payload) {
        state[key] = payload[key];
      }
    },
    openAssigneeListReducers(state) {
      return {
        ...state,
        isAssigneeListVisible: true,
      };
    },
    closeAssigneeListReducers(state) {
      return {
        ...state,
        isAssigneeListVisible: false,
        assigneeList: [],
        taskDetail: {},
        keyword: '',
        assigneeFlag: state.assigneeFlag + 1,
      };
    },
    // 保存高级查询的SearchTable
    saveTableSearch(state, action) {
      const { TableSearch } = action?.payload;

      return {
        ...state,
        TableSearch,
      };
    },
    // 保存文档尺寸
    saveDocumentSize(state) {
      const docSize = getDocSize();

      return {
        ...state,
        docSize,
      };
    },
    saveReAssign(state: any, action: any) {
      const reassign = action.payload?.reassign;
      return {
        ...state,
        reAssign: {
          ...state.reAssign,
          ...reassign,
        },
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }: any) {
      history.listen(() => {
        dispatch({
          type: 'historyListener',
        });
      });

      dispatch({
        type: 'changeSwitchListener',
      });
    },
  },
};
