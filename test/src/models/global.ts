import { Category } from '@/auth/Constant';
import { getAuth } from '@/auth/Utils';
import { tenant } from '@/components/Tenant';
import { findAll } from '@/services/miscSectionConfigControllerService';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import { getGlobalConfig } from '@/services/miscGlobalConfigControllerService';
import { LS, LSKey } from '@/utils/cache';
import { messageModal } from '@/utils/commonMessage';
import { produce } from 'immer';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { history } from 'umi';

declare const window: any;

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    isShowHeader: true,
    isShowMenu: true,
    notices: [],
    blackList: [],
    pathname: '',
    guidance: false,
    guidanceIndex: 0,
    golbalConfig: {},
  },

  effects: {
    *clearNotices({ payload }: any, { put }: any) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
    },
    /**
     * 访问task详情控制 只允许查看assign到本人的task
     */
    visitTaskDetail: [
      // eslint-disable-next-line func-names
      function* ({ payload }: any, { select }: any) {
        const taskId = payload?.taskId;
        const reload = payload?.reload;
        const blank = payload?.blank;

        const { pathname, search } = window.location;

        if (!lodash.includes(pathname, 'task/detail') && !lodash.includes(pathname, 'proposal')) {
          LS.setItem(LSKey.TASK_PRE_HISTORY, `${pathname}${search}`);
        }

        if (!lodash.includes(pathname, 'proposal')) {
          LS.setItem(LSKey.PROPOSAL_PRE_HISTORY, `${pathname}${search}`);
        }

        const commonAuthorityList: any[] = yield select(
          (state: any) => state.authController.commonAuthorityList
        );
        const response: any = yield getTask(
          objectToFormData({
            taskId,
          })
        );

        if (
          lodash.isPlainObject(response) &&
          !!response?.success &&
          lodash.isPlainObject(response?.resultData)
        ) {
          const { caseCategory, taskDefKey: activityKey } = response.resultData || {};
          const taskDisabled = getAuth(commonAuthorityList, {
            authorityCode: 'UnviewableAllTaskDetail',
          });
          const taskView: boolean = getAuth(commonAuthorityList, {
            authorityCode: Category.taskView,
            caseCategory,
            activityCode: activityKey,
          });

          if (!taskView || taskDisabled) {
            messageModal({
              code: 403,
              typeCode: 'Label_COM_WarningMessage',
              dictCode:
                'app.navigator.taskDetail.360.sorry-you-have-no-permission-to-open-this-task-details-page',
            });
            return;
          }

          const url = `/process/task/detail/${taskId}`;
          if (blank) {
            window.open(url, '_blank');
          } else if (reload) {
            window.location.href = url;
          } else {
            history.push(url);
          }
          // 加这句话是 因为history.push会把window.history.stateq清空
          window.history.replaceState(response.resultData, '');
        }
      },
      { type: 'takeLatest' },
    ],
    visitOpusTaskDetail: [
      // eslint-disable-next-line func-names
      function* ({ payload }: any, { select }: any) {
        const taskId = payload?.taskId;
        const reload = payload?.reload;
        const blank = payload?.blank;

        const { pathname, search } = window.location;

        if (!lodash.includes(pathname, 'task/detail') && !lodash.includes(pathname, 'proposal')) {
          LS.setItem(LSKey.TASK_PRE_HISTORY, `${pathname}${search}`);
        }

        if (!lodash.includes(pathname, 'proposal')) {
          LS.setItem(LSKey.PROPOSAL_PRE_HISTORY, `${pathname}${search}`);
        }

        const commonAuthorityList: any[] = yield select(
          (state: any) => state.authController.commonAuthorityList
        );
        const response: any = yield getTask(
          objectToFormData({
            taskId,
          })
        );

        if (
          lodash.isPlainObject(response) &&
          !!response?.success &&
          lodash.isPlainObject(response?.resultData)
        ) {
          const { caseCategory, taskDefKey: activityKey } = response.resultData || {};

          const taskView: boolean = getAuth(commonAuthorityList, {
            authorityCode: Category.taskView,
            caseCategory,
            activityCode: activityKey,
          });
          const taskDisabled = getAuth(commonAuthorityList, {
            authorityCode: 'UnviewableAllTaskDetail',
          });

          if (!taskView || taskDisabled) {
            messageModal({
              code: 403,
              typeCode: 'Label_COM_WarningMessage',
              dictCode:
                'app.navigator.taskDetail.360.sorry-you-have-no-permission-to-open-this-task-details-page',
            });
            return;
          }

          const url = `/opus/process/task/detail/${taskId}`;
          if (blank) {
            window.open(url, '_blank');
          } else if (reload) {
            window.location.href = url;
          } else {
            history.push(url);
          }
          // 加这句话是 因为history.push会把window.history.stateq清空
          window.history.replaceState(response.resultData, '');
        }
      },
      { type: 'takeLatest' },
    ],
    *saveBlackList(_: any, { put, call }: any) {
      const blackList: Object = yield call(findAll);
      yield put({
        type: 'saveBlackListReducers',
        payload: {
          blackList: blackList?.resultData,
        },
      });
    },
    *accessStore(_: any, { select }: any): any {
      return yield select();
    },
    *getGlobalConfig(_: any, { put, call }: any) {
      const response: Object = yield call(getGlobalConfig, { codeType: 'specialCharList' });
      if (
        lodash.isPlainObject(response) &&
        !!response?.success &&
        lodash.isArray(response?.resultData)
      ) {
        const golbalConfig = lodash
          .chain(response.resultData)
          .keyBy('codeType')
          .mapValues((item) => ({
            region: item.region,
            defaultValue: item.defaultValue,
          }))
          .value();
        yield put({
          type: 'saveGlobalConfig',
          payload: {
            golbalConfig,
          },
        });
      }
    },
    *clearGlobalConfig(_: any, { put }: any) {
      yield put({
        type: 'saveGlobalConfig',
        payload: {
          golbalConfig: {},
        },
      });
    },
  },

  reducers: {
    changeGuidance(state: any, { payload }: any) {
      return {
        ...state,
        guidance: payload,
      };
    },
    changeGuidanceIndex(state: any, { payload }: any) {
      return {
        ...state,
        guidanceIndex: payload,
      };
    },
    changeLayoutCollapsed(state: any, { payload }: any) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state: any, { payload }: any) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveGlobalConfig(state: any, { payload }: any) {
      const { golbalConfig } = payload;

      return {
        ...state,
        golbalConfig,
      };
    },
    saveClearedNotices(state: any, { payload }: any) {
      return {
        ...state,
        notices: state.notices.filter((item: any) => item.type !== payload),
      };
    },
    changeLayoutHeader(state: any, { payload }: any) {
      const { isShowHeader } = payload;

      return {
        ...state,
        isShowHeader,
      };
    },
    changeLayoutMenuHeader(state: any, { payload }: any) {
      const { isShowMenu } = payload;

      return {
        ...state,
        isShowMenu,
      };
    },
    saveEnv(state: any) {
      return produce(state, (draftSate: any) => {
        const draft = draftSate;
        draft.Env = tenant.region();
      });
    },
    saveBlackListReducers(state: any, { payload }: any) {
      const { blackList } = payload;
      return {
        ...state,
        blackList,
      };
    },
    pathnameUpdate(state: any, { payload }: any) {
      const { pathname } = payload;

      return {
        ...state,
        pathname,
      };
    },
  },

  subscriptions: {
    // eslint-disable-next-line no-shadow
    setup({ history: historyAPI, dispatch }: any) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return historyAPI.listen(({location: { pathname, search }}: any) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }

        dispatch({
          type: 'pathnameUpdate',
          payload: { pathname },
        });
      });
    },
  },
};
