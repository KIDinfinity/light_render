import dcCaseInquiryControllerService from '@/services/dcCaseInquiryControllerService';
import dcTaskInquiryControllerService from '@/services/dcTaskInquiryControllerService';
import userCenterUserInquiryControllerService from '@/services/userCenterUserInquiryControllerService';
import lodash from 'lodash';
import navigator from 'navigator/api';

const getQueryList = (responses: any) =>
  responses.reduce(
    (pre: any, curr: any) => {
      const result = pre;
      if (curr?.success && lodash.isPlainObject(curr.resultData)) {
        result.rows = result.rows.concat(curr.resultData.rows).filter((item: any) => !!item);
        result.total += curr.resultData.total;
      }
      return result;
    },
    {
      rows: [],
      total: 0,
    }
  );

export default {
  namespace: 'workspaceAI',

  state: {
    searchValue: '',
    machineKey: '',
    moduleShow: {
      showBack: false,
      showCreateCase: false,
      showBellList: false,
    },
    queryListOfCase: {},
    queryListOfTask: {},
    queryListOfUser: {},
    showLengthOfCase: 3,
    showLengthOfTask: 3,
    showLengthOfUser: 3,
    defaultTaskStatus: ['todo', 'pending'],
  },

  effects: {
    *queryListOfTaskLast(action: any, { select, call, put }: any) {
      const searchValue = yield select((state: any) => state.workspaceAI.searchValue);
      const taskStatus = yield select((state: any) => state.workspaceAI.defaultTaskStatus);
      const responses: any[] = yield [
        call(dcTaskInquiryControllerService.advSearch, {
          currentPage: 1,
          pageSize: 4,
          params: { processInstanceId: searchValue, taskStatus },
          sortName: 'procInstId',
          sortOrder: 'asc',
        }),
        call(dcTaskInquiryControllerService.advSearch, {
          currentPage: 1,
          pageSize: 4,
          params: { inquiryBusinessNo: searchValue, taskStatus },
          sortName: 'procInstId',
          sortOrder: 'asc',
        }),
      ];
      const tasks = getQueryList(responses);
      yield put({
        type: 'saveQueryListOfTask',
        payload: {
          queryListOfTask: tasks,
        },
      });
      return { taskCaseNoResult: responses?.[0], taskBusinessResult: responses?.[1] };
    },
    *queryListOfSmartCircle(action: any, { select, call, put }: any) {
      const searchValue = yield select((state: any) => state.workspaceAI.searchValue);
      const reg = /^Relevant\s+case\s+of\s+/i;
      if (reg.test(searchValue)) {
        const procInstId = lodash.isString(searchValue) && searchValue.replace(reg, '');
        const queryRelevantCase = yield call(
          userCenterUserInquiryControllerService.findProcessRelationshipSideBar,
          {
            pageSize: 5,
            currentPage: 1,
            params: {
              procInstId,
            },
            sortName: null,
            sortOrder: null,
          }
        );

        const { resultData, success } = lodash.pick(queryRelevantCase, ['resultData', 'success']);

        if (success) {
          const caseRows = lodash
            .chain(resultData)
            .get('rows', [])
            .map((item: any) => {
              return lodash.get(item, 'caseInfo');
            })
            .filter((item: any) => !!item)
            .value();

          const taskRows = lodash
            .chain(resultData)
            .get('rows', [])
            .map((item: any) => {
              return lodash.get(item, 'currentTaskInfo');
            })
            .filter((item: any) => !!item)
            .value();

          yield put({
            type: 'saveQueryListOfTask',
            payload: {
              queryListOfTask: {
                rows: taskRows,
                total: taskRows?.length,
              },
            },
          });
          yield put({
            type: 'saveQueryListOfCase',
            payload: {
              queryListOfCase: {
                rows: caseRows,
                total: caseRows?.length,
              },
            },
          });

          return {
            caseCaseNoResult: caseRows,
            caseBusinessResult: [],
            taskCaseNoResult: taskRows,
            taskBusinessResult: [],
          };
        } else {
          yield put({
            type: 'saveQueryListOfTask',
            payload: {
              queryListOfTask: {
                rows: [],
                total: 0,
              },
            },
          });
          yield put({
            type: 'saveQueryListOfCase',
            payload: {
              queryListOfCase: {
                rows: [],
                total: 0,
              },
            },
          });
        }
        return {};
      } else {
        const { taskCaseNoResult, taskBusinessResult } = yield put({
          type: 'queryListOfTaskLast',
        });
        navigator.AdvancedQueryListener.send({
          type: 'reset',
        });

        const queryWithCaseNo = yield call(dcCaseInquiryControllerService.advSearch, {
          currentPage: 1,
          pageSize: 4,
          params: { processInstanceId: searchValue, defaultSortName: 'procInstId' },
          sortName: 'procInstId',
          sortOrder: 'asc',
        });

        const queryWithBusinessNo = yield call(dcCaseInquiryControllerService.advSearch, {
          currentPage: 1,
          pageSize: 4,
          params: { inquiryBusinessNo: searchValue, defaultSortName: 'procInstId' },
          sortName: 'procInstId',
          sortOrder: 'asc',
        });

        const responses = [queryWithCaseNo, queryWithBusinessNo];
        const queryWithCaseNoDataTotal = queryWithCaseNo?.resultData?.total;
        const queryWithBusinessNoDataTotal = queryWithBusinessNo?.resultData?.total;
        // 当成 caseNo 查到数据时
        if (queryWithCaseNoDataTotal > 0) {
          navigator.AdvancedQueryListener.send({
            type: 'loadEnd',
            dataType: 'processInstanceId',
            value: searchValue,
          });
        }
        // 当成 businessNo 查到数据时 或者 所有情况都查不到数据时当成businessNo 设置
        if (
          queryWithBusinessNoDataTotal > 0 ||
          (queryWithBusinessNoDataTotal === 0 && queryWithBusinessNoDataTotal === 0)
        ) {
          navigator.AdvancedQueryListener.send({
            type: 'loadEnd',
            dataType: 'inquiryBusinessNo',
            value: searchValue,
          });
        }

        const cases = getQueryList(responses);
        yield put({
          type: 'saveQueryListOfCase',
          payload: {
            queryListOfCase: cases,
          },
        });
        return {
          caseCaseNoResult: queryWithCaseNo,
          caseBusinessResult: queryWithBusinessNo,
          taskCaseNoResult,
          taskBusinessResult,
        };
      }
    },
    *queryListOfUserLast(action: any, { select, call, put }: any) {
      const searchValue = yield select((state: any) => state.workspaceAI.searchValue);
      const response = yield call(userCenterUserInquiryControllerService.fuzzyQuery, {
        currentPage: 1,
        pageSize: 4,
        params: { kw: searchValue },
      });

      if (response?.success) {
        yield put({
          type: 'saveQueryListOfUser',
          payload: {
            queryListOfUser: response.resultData,
          },
        });
      }
    },
  },
  reducers: {
    // 简单搜索输入框的变化
    saveSearchValue(state: any, action: any) {
      const {
        payload: { searchValue },
      } = action;

      return {
        ...state,
        searchValue,
      };
    },

    // ---------------------下面三个是保存从后台拿到的case、task、user的list
    saveQueryListOfCase(state: any, action: any) {
      const {
        payload: { queryListOfCase },
      } = action;

      return {
        ...state,
        queryListOfCase,
      };
    },
    saveQueryListOfTask(state: any, action: any) {
      const {
        payload: { queryListOfTask },
      } = action;
      return {
        ...state,
        queryListOfTask,
      };
    },
    saveQueryListOfUser(state: any, action: any) {
      const {
        payload: { queryListOfUser },
      } = action;

      return {
        ...state,
        queryListOfUser,
      };
    },
    // ---------------------上面三个是保存从后台拿到的case、task、user的list

    changeState(state: any, action: any) {
      const newState = { ...state, ...action.payload };

      return {
        ...newState,
      };
    },
    saveMachineKey(state: any, action: any) {
      const { machineKey } = action.payload;
      return {
        ...state,
        machineKey,
      };
    },
  },
};
