// @ts-nocheck

import lodash, { isEmpty } from 'lodash';
import userCenterUserRelationControllerService from '@/services/userCenterUserRelationControllerService';
import userCenterOrganizationControllerService from '@/services/userCenterOrganizationControllerService';
import dcUserControllerService from '@/services/dcUserControllerService';
import navigatorUserControllerService from '@/services/navigatorUserControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formUtils } from 'basic/components/Form';
import { resRevert } from '@/utils/transform';

export default {
  namespace: 'workspaceUser',
  state: {
    userInfo: null,
    allUsers: [],
    list: {
      list: [],
    },
    richList: {
      list: [],
    },
    permission: null,
    userListByOwner: [],
    groupListByOwner: [],
    userOrganization: [],
    allOrganization: [],
  },

  effects: {
    advancedQuery: [
      function* advancedQuery({ payload }, { call, put, select }) {
        const configuration = yield select((state) => ({
          configuration: state.configController.configuration,
          sortFromTable: state.advancedQueryController.sortFromTable,
        }));

        const searchObj = yield select((state) => state.advancedQueryController.searchObj);

        if (isEmpty(configuration.configuration)) {
          configuration.configuration = yield put.resolve({
            type: 'configController/getConfiguration',
          });
        }

        const { isScrollSearch, ...otherPayload } = payload;

        const newParams = formUtils.transfersParams(otherPayload, configuration, 'user');
        let response;
        if (searchObj.mode !== 'card') {
          response = yield call(dcUserControllerService.advSearch, newParams);
          if (response?.success) {
            yield put({
              type: 'save',
              payload: {
                list: resRevert(response),
              },
            });
          }
        } else {
          const list = yield select((state) => state.workspaceUser.richList);
          response = yield call(navigatorUserControllerService.advancedQueryRich, newParams);
          if (response?.success) {
            const resRevertRes = resRevert(response);
            if (isScrollSearch) {
              resRevertRes.list = lodash.concat(list.list, resRevertRes.list);
            }
            yield put({
              type: 'save',
              payload: {
                richList: resRevertRes,
              },
            });
          }
        }
      },
      { type: 'takeLatest' },
    ],

    // Query UserInfoList By Owner
    *findUserListByOwner({ payload }, { call, put }) {
      const response = yield call(
        userCenterUserRelationControllerService.findUserListByOwner,
        payload
      );

      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            userListByOwner: response?.resultData || [],
          },
        });
      }
    },

    *getUserOrganization({ signal = null }, { call, put, select, take }) {
      let userId = yield select((state) => state.user.currentUser.userId);
      if (!userId) {
        yield take('user/fetchCurrent/@@end');
      }
      userId = yield select((state) => state.user.currentUser.userId);
      const params = objectToFormData({
        userId,
      });
      const response = yield call(
        userCenterOrganizationControllerService.treeFindOrganizationByUserId,
        params,
        { signal }
      );

      function organization(list) {
        return list.map((item) => {
          // eslint-disable-next-line no-param-reassign
          item.children = item.children && organization(item.children);
          return {
            key: item.organizationCode,
            title: item.organizationName,
            value: item.organizationCode,
            label: item.organizationCode,
            children: item.children,
          };
        });
      }
      if (response?.success) {
        const userOrganization = organization(response.resultData);
        yield put({
          type: 'saveUserOrganization',
          payload: {
            userOrganization,
            userOrganizationCodeList:
              response.resultData?.map?.((item) => item.organizationCode) || [],
          },
        });
      }
    },

    *getAllOrganization(_, { call, put, select }) {
      const userId = yield select((state) => state.user.currentUser?.userId);

      const params = objectToFormData({
        userId,
      });

      const response = yield call(
        userCenterOrganizationControllerService.treeFindOrganization,
        params
      );

      function organization(list = []) {
        return (
          list &&
          list.length > 0 &&
          list.map((item) => ({
            title: item.organizationName,
            value: item.organizationCode,
            label: item.organizationCode,
            children: organization(item.children),
          }))
        );
      }

      if (response?.success) {
        const allOrganization = organization(response.resultData);
        yield put({
          type: 'saveAllOrganization',
          payload: {
            allOrganization,
          },
        });
      }
    },
    *refreshSession(_, { call }) {
      yield call(userCenterOrganizationControllerService.refreshSession);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveUserOrganization(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveAllOrganization(state, { payload }) {
      return {
        ...state,
        allOrganization: payload.allOrganization,
      };
    },
    allUsers(state) {
      return {
        ...state,
      };
    },
    updateUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
    updatePermission(state, { payload }) {
      return {
        ...state,
        permission: payload,
      };
    },
    assigneeList(state, { payload }) {
      return {
        ...state,
        assigneeList: payload,
      };
    },
  },
};
