import lodash from 'lodash';
import {flatten} from 'flattenjs';
import userCenterOrganizationControllerService from '@/services/userCenterOrganizationControllerService';

export default {
  namespace: 'homeTaskFlowFilter',

  state: {
    filters: {
      group: '',
      assignee: 'all',
      caseCategory: 'all',
      taskStatus: 'all',
    },
    assigneeList: [],
    organizationMemberList: [],
    currentAssignee: '',
  },

  effects: {
    *filterInit({ signal = null }, { call, put, select, take }) {
      yield put({ type: 'process/queryProcessDefTypeList', signal });
      yield put({ type: 'workspaceUser/getUserOrganization', signal });
      yield take('workspaceUser/getUserOrganization/@@end');
      const currentUser = yield select((state) => state.user.currentUser);
      const userOrganizationList = yield select((state) => state.workspaceUser.userOrganization);

      const userOrganizationCodeList = lodash.filter(flatten(userOrganizationList), (value: any, key: string) => key.includes('value'));

        const response = yield call(
          userCenterOrganizationControllerService.treeFindOrganizationMembersByCode,
          userOrganizationCodeList,
          { signal, qsStringifyOption: { indices: false } }
        );

        if (
          lodash.isPlainObject(response) &&
          response.success &&
          lodash.isArray(response.resultData)
        ) {
          const list = lodash.filter(response.resultData, (el: any) => el);

          yield put({
            type: 'homeTaskFlow/fetchFlowData',
            payload: {
              assignee: currentUser?.userId,
              organizationMemberList: lodash
                .compact(response.resultData)
                .map((item) => item.userId),
            },
            signal,
          });
          yield put({
            type: 'saveAssigneeList',
            payload: {
              assigneeList: list,
            },
          });
          yield put({
            type: 'saveOrganizationMember',
            payload: {
              organizationMemberList: lodash.compact(list).map((item) => item.userId),
            },
          });
        }
      // } else {
      //   yield put({
      //     type: 'homeTaskFlow/fetchFlowData',
      //     payload: {
      //       assignee: currentUser?.userId,
      //       organizationMemberList: [currentUser?.userId],
      //     },
      //     signal,
      //   });
      //   yield put({
      //     type: 'saveAssigneeList',
      //     payload: {
      //       assigneeList: [currentUser?.userId],
      //     },
      //   });
      //   yield put({
      //     type: 'saveOrganizationMember',
      //     payload: {
      //       organizationMemberList: lodash
      //         .compact([currentUser?.userId])
      //         .map((item) => item.userId),
      //     },
      //   });
      // }
      yield put({
        type: 'saveFilters',
        payload: {
          filters: {
            group: userOrganizationCodeList,
          },
        },
      });
      yield put({
        type: 'homeTaskFlow/flowChange',
        signal,
      });
    },
    *filterChange({ payload, signal = null }, { call, put, select }) {
      const { changeValues } = payload;

      if (changeValues.group) {
        const response = yield call(
          userCenterOrganizationControllerService.treeFindOrganizationMembersByCode,
          changeValues.group,
          { signal }
        );

        if (
          lodash.isPlainObject(response) &&
          response.success &&
          lodash.isArray(response.resultData)
        ) {
          const list = lodash.filter(response.resultData, (el: any) => el);
          yield put({
            type: 'saveAssigneeList',
            payload: {
              assigneeList: list,
            },
          });
        }

        yield put({
          type: 'saveFilters',
          payload: {
            filters: {
              ...changeValues,
              assignee: 'all',
            },
          },
        });

        const currentCaseCategory = yield select((state) => state.homeTaskFlow.currentCaseCategory);
        const currentUser = yield select((state) => state.user.currentUser);
        const assigneeList = yield select((state) => state.homeTaskFlowFilter.assigneeList);
        const currentAssignee = currentUser?.userId;
        const organizationMemberList = assigneeList?.map?.((item) => item.userId);
        yield put({
          type: 'process/activities',
          payload: {
            assignee: currentAssignee,
            caseCategory: currentCaseCategory?.caseCategory,
            organizationMemberList,
            processDefId: currentCaseCategory?.processDefId,
          },
          signal,
        });
        yield put({
          type: 'saveCurrentAssignee',
          payload: {
            currentAssignee,
          },
        });
        yield put({
          type: 'saveOrganizationMember',
          payload: {
            organizationMemberList,
          },
        });
      } else {
        yield put({
          type: 'saveFilters',
          payload: {
            filters: {
              ...changeValues,
            },
          },
        });
      }

      if (changeValues.assignee) {
        const currentCaseCategory = yield select((state) => state.homeTaskFlow.currentCaseCategory);
        const currentUser = yield select((state) => state.user.currentUser);
        const assigneeList = yield select((state) => state.homeTaskFlowFilter.assigneeList);
        const currentAssignee =
          changeValues.assignee === 'all' ? currentUser?.userId : changeValues.assignee;
        const organizationMemberList =
          changeValues.assignee === 'all' ? assigneeList?.map?.((item) => item.userId) : [];
        yield put({
          type: 'process/activities',
          payload: {
            assignee: currentAssignee,
            caseCategory: currentCaseCategory?.caseCategory,
            organizationMemberList,
            processDefId: currentCaseCategory?.processDefId,
          },
          signal,
        });
        yield put({
          type: 'saveCurrentAssignee',
          payload: {
            currentAssignee,
          },
        });
        yield put({
          type: 'saveOrganizationMember',
          payload: {
            organizationMemberList,
          },
        });
      }

      yield put({
        type: 'homeTaskFlow/flowChange',
        signal,
      });
    },
  },

  reducers: {
    saveFilters(state, action) {
      const {
        payload: { filters },
      } = action;
      const { filters: orginFilters } = state;

      return {
        ...state,
        filters: {
          ...orginFilters,
          ...filters,
        },
      };
    },
    saveAssigneeList(state, action) {
      const {
        payload: { assigneeList },
      } = action;

      return {
        ...state,
        assigneeList,
      };
    },
    saveCurrentAssignee(state, { payload }) {
      const { currentAssignee } = payload;

      return {
        ...state,
        currentAssignee,
      };
    },

    saveOrganizationMember(state, { payload }) {
      const { organizationMemberList } = payload;

      return {
        ...state,
        organizationMemberList,
      };
    },
  },
};
