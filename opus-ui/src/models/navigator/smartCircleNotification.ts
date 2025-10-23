import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import mcBpMessageControllerService from '@/services/mcBpMessageControllerService';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default {
  namespace: 'smartCircleNotification',

  state: {
    messageList: {
      rows: [],
    },
    messageNum: '',
    noReadAllStatus: [],
    currentPagination: {
      currentPage: 0,
      pageSize: 10,
    },
  },

  effects: {
    *messageList({ payload }: any, { call, put, select }: any) {
      const userId = yield select((state: any) => state.user.currentUser.userId);
      const searchValue = yield select((state: any) => state.workspaceAI.searchValue);
      if (userId) {
        const [responseTotal, response] = yield [
          call(mcBpMessageControllerService.list, {
            currentPage: payload?.currentPage || 1,
            pageSize: 10,
            params: {
              destId: userId,
              status: 0,
              content: searchValue,
            },
          }),
          call(mcBpMessageControllerService.list, {
            currentPage: payload?.currentPage || 1,
            pageSize: 10,
            params: {
              destId: userId,
              content: searchValue,
            },
          }),
        ];

        if (
          lodash.isPlainObject(responseTotal) &&
          responseTotal.success &&
          lodash.isPlainObject(responseTotal.resultData) &&
          lodash.isNumber(responseTotal.resultData.total) &&
          lodash.isPlainObject(response) &&
          response.success &&
          lodash.isPlainObject(response.resultData)
        ) {
          if (payload?.isUpdate) {
            yield put({
              type: 'updateMessageList',
              payload: {
                messageList: response.resultData,
                messageNum: responseTotal.resultData.total,
              },
            });
          } else {
            yield put({
              type: 'extendMessageList',
              payload: {
                messageList: response.resultData,
                messageNum: responseTotal.resultData.total,
              },
            });
          }
        }
      }
    },
    // 搜索
    searchListValue: [
      function* searchListValue(_: any, { put, call, select }: any) {
        yield call(delay, 300);
        const userId = yield select((state: any) => state.user.currentUser.userId);
        const searchValue = yield select((state: any) => state.workspaceAI.searchValue);
        const [responseTotal, response] = yield [
          call(mcBpMessageControllerService.list, {
            currentPage: 1,
            pageSize: 10,
            params: {
              destId: userId,
              status: 0,
              content: searchValue,
            },
          }),
          call(mcBpMessageControllerService.list, {
            currentPage: 1,
            pageSize: 10,
            params: {
              destId: userId,
              content: searchValue,
            },
          }),
        ];
        if (
          lodash.isPlainObject(response) &&
          response.success &&
          lodash.isArray(response.resultData.rows)
        ) {
          yield put({
            type: 'updateMessageList',
            payload: {
              messageList: response.resultData,
              messageNum: responseTotal.resultData.total,
            },
          });
        }
      },
      { type: 'takeLatest' },
    ],
    *remove({ payload }: any, { call, put, select }: any) {
      const searchValue = yield select((state: any) => state.workspaceAI.searchValue);
      const response = yield call(
        mcBpMessageControllerService.del,
        objectToFormData({
          mid: payload.mid,
          status: payload.status,
        })
      );
      if (response?.success) {
        const issearch = searchValue ? 'searchListValue' : 'messageList';
        yield put({
          type: issearch,
          payload: {
            currentPage: 1,
            isUpdate: true,
          },
        });
      }

      return response;
    },
    *removeAll(_: any, { select, call, put }: any) {
      const userId = yield select((state: any) => state.user.currentUser.userId);
      const searchValue = yield select((state: any) => state.workspaceAI.searchValue);
      const response = yield call(
        mcBpMessageControllerService.batchDel,
        objectToFormData({
          userId,
          content: searchValue || '',
        })
      );

      if (lodash.isPlainObject(response) && response.success) {
        yield put({
          type: 'searchListValue',
          payload: {
            currentPage: 1,
            isUpdate: true,
          },
        });
      }

      return response;
    },
    *read({ payload }: any, { call, put }: any) {
      const response = yield call(mcBpMessageControllerService.updStatus, {
        mid: payload.mid,
        status: 1,
      });
      if (response?.success) {
        yield put({
          type: 'saveUpdateMessageItem',
          payload: {
            mid: payload.mid,
          },
        });
      }
      return response;
    },
    *readAll(_: any, { select, call, put }: any) {
      const userId = yield select((state: any) => state.user.currentUser.userId);
      const searchValue = yield select((state: any) => state.workspaceAI.searchValue);
      const response = yield call(
        mcBpMessageControllerService.batchUpdStatus,
        objectToFormData({
          userId,
          content: searchValue || '',
        })
        // searchValue ? { searchValue } : {}
      );

      if (lodash.isPlainObject(response) && response.success) {
        yield put({
          type: 'searchListValue',
          payload: {
            currentPage: 1,
            isUpdate: true,
          },
        });
      }

      return response;
    },
  },

  reducers: {
    extendMessageList(state: any, action: any) {
      const { messageList: orginMessageList } = state;
      const {
        payload: { messageList, messageNum },
      } = action;

      return {
        ...state,
        messageList: {
          ...orginMessageList,
          ...messageList,
          rows: lodash.uniqBy(orginMessageList.rows.concat(messageList.rows), 'id'),
        },
        messageNum,
      };
    },
    updateMessageList(state: any, action: any) {
      const {
        payload: { messageList, messageNum },
      } = action;

      return {
        ...state,
        messageList,
        messageNum,
      };
    },

    saveRemoveMessageItem(state: any, action: any) {
      const { messageList: orginMessageList } = state;
      const {
        payload: { idx, mid },
      } = action;

      orginMessageList.rows.map((item: any) => {
        if (item.mid === mid) {
          orginMessageList.rows.splice(idx, 1);
        }

        return item;
      });

      return {
        ...state,
        messageList: {
          ...orginMessageList,
        },
      };
    },
    saveUpdateMessageItem(state: any, action: any) {
      const orginMessageList = lodash.cloneDeep(state.messageList);
      const {
        payload: { mid },
      } = action;

      const newList = lodash.map(orginMessageList?.rows, (item) => {
        const message = { ...item };
        if (message.mid === mid) {
          message.status = 1;
        }
        return message;
      });

      return {
        ...state,
        messageList: {
          ...orginMessageList,
          rows: [...newList],
        },
      };
    },

    saveScroll(state: any, action: any) {
      const {
        payload: { scroll },
      } = action;

      return { ...state, scroll };
    },

    clearMessageList() {
      return {
        messageList: {
          rows: [],
        },
      };
    },
  },
};
