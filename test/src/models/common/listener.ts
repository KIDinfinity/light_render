import lodash from 'lodash';

export default {
  namespace: 'listener',
  state: {
    // 监听队列中心
    listenCenter: {
      information: [],
      pending: [],
      360: [],
    },
    // 已存任务中心
    taskCenter: {
      information: [],
      pending: [],
      360: [],
    },
    // 回调队列中心
    callbackCenter: {
      information: [],
      pending: [],
      360: [],
    },
  },
  effects: {
    /**
     * 清除某个target的监听队列
     * @param {string} target 目标队列
     */
    *clearListenList({ payload }, { select, cancel }) {
      const taskCenter = yield select((state) => state.listener.taskCenter);
      const target = lodash.get(payload, 'target', '');
      const targetTaskList = taskCenter[target];
      if (targetTaskList) {
        for (let i = 0; i < targetTaskList.length; i++) {
          yield cancel(targetTaskList[i]);
        }
      }
    },
    /**
     * 设置监听队列
     * @param {string} target 目标队列
     * @param {array} listenList 监听队列
     * @param {array} callbackList 回调队列
     * @param {string} filter.filterBase 过滤根据
     * @param {any} filter.filterValue 过滤值
     * @param {string} filter.filterTargetAction 过滤的目标action
     * @param {string} filter.mode TODO：过滤的模式 balckList/whiteList
     */
    *setListenerList({ payload }, { select, put }) {
      let listenList = lodash.get(payload, 'listenList', []);
      const callbackList = lodash.get(payload, 'callBackList', []);
      const target = lodash.get(payload, 'target', '');
      // 暂时只提供黑名单模式的过滤机制
      const filterBase = lodash.get(payload, 'filter.filterBase', '');
      const filterValue = lodash.get(payload, 'filter.filterValue', '');
      const filterTargetAction = lodash.get(payload, 'filter.filterTargetAction', '');
      if (filterBase && filterValue) {
        const targetFilterValue = yield select((state) => lodash.get(state, filterBase));
        listenList = listenList.filter((item) => {
          const isEqual = lodash.isEqual(targetFilterValue, filterValue);
          if (isEqual) {
            return item.actionName === filterTargetAction;
          }
        });
      }
      yield put({
        type: 'addListener',
        payload: {
          target,
          listenList,
        },
      });
      const nameList = listenList.map((item) => item.actionName);
      yield put({
        type: 'setListenList',
        payload: {
          target,
          listenList: nameList,
        },
      });
      yield put({
        type: 'setCallbackList',
        payload: {
          target,
          callbackList,
        },
      });
    },
    /**
     * @param {string} target
     * @param {array} listenList
     */
    *addListener({ payload }, { put, takeEvery }) {
      const target = lodash.get(payload, 'target');
      const listenList = lodash.get(payload, 'listenList', []);
      const taskIdList = [];
      for (let i = 0; i < listenList.length; i++) {
        const { actionName } = listenList[i];
        const { condition } = listenList[i];

        const id = yield takeEvery(`${actionName}`, function* action(action) {
          const p = lodash.get(action, 'payload');
          let isRemove = true;
          // 当没有条件 或者条件相等时
          if (condition && !lodash.isEqual(condition, p)) {
            isRemove = false;
          }
          if (isRemove) {
            yield put({
              type: 'removeListenListItem',
              payload: {
                actionItem: actionName,
                target,
              },
            });
          }
        });
        taskIdList.push(id);
      }
      yield put({
        type: 'setTaskList',
        payload: {
          target,
          taskIdList,
        },
      });
    },
    /**
     * @param {string} target
     * @param {string} actionItem
     */
    *removeListenListItem({ payload }, { select, put }) {
      const actionItem = lodash.get(payload, 'actionItem', '');
      const target = lodash.get(payload, 'target', '');
      const listenCenter = yield select((state) => state.listener.listenCenter);
      const listenList = listenCenter[target];
      const listenSet = new Set(listenList);
      listenSet.delete(actionItem);
      if (listenList) {
        yield put({
          type: 'setListenList',
          payload: {
            listenList: [...listenSet],
            target,
          },
        });
        if (listenList.length === 1 && listenSet.size === 0) {
          yield put({
            type: 'runCallbackList',
            payload: {
              target,
            },
          });
        }
      }
    },
    /**
     * 执行回调队列
     * @param {string} target
     */
    *runCallbackList({ payload }, { select, put }) {
      const callbackCenter = yield select((state) => state.listener.callbackCenter);
      const target = lodash.get(payload, 'target', '');
      const callbackList = callbackCenter[target];
      if (callbackList) {
        for (let i = 0; i < callbackList.length; i++) {
          yield put({
            type: callbackList[i].type,
            payload: callbackList[i].payload,
          });
        }
      }
    },
  },
  reducers: {
    /**
     * @param {string} target
     * @param {array} listenList
     */
    setListenList(state, action) {
      const target = lodash.get(action, 'payload.target', '');
      const listenList = lodash.get(action, 'payload.listenList');
      const { listenCenter } = state;
      return {
        ...state,
        listenCenter: {
          ...listenCenter,
          [target]: listenList,
        },
      };
    },
    /**
     *
     * @param {string} target
     * @param {array} callbackList
     */
    setCallbackList(state, action) {
      const target = lodash.get(action, 'payload.target', '');
      const callbackList = lodash.get(action, 'payload.callbackList', []);
      const { callbackCenter } = state;
      return {
        ...state,
        callbackCenter: {
          ...callbackCenter,
          [target]: callbackList,
        },
      };
    },
    /**
     * @param {string} target
     * @param {array} taskIdList
     */
    setTaskList(state, action) {
      const target = lodash.get(action, 'payload.target', '');
      const taskIdList = lodash.get(action, 'payload.taskIdList', []);
      const { taskCenter } = state;
      return {
        ...state,
        taskCenter: {
          ...taskCenter,
          [target]: taskIdList,
        },
      };
    },
  },
};
