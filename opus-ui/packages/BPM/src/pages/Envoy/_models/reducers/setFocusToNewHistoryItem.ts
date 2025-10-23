import lodash from 'lodash';
import setActivedGroupKey from './setActivedGroupKey';
import setHistoryGroupKey from './setHistoryGroupKey';
import saveErrorInfo from './saveErrorInfo';

interface IAction {
  payload: {
    historyGroupKey: number;
  };
}

export default function (state: any, { payload }: IAction) {
  let newState = state;
  newState = setActivedGroupKey(newState, {
    payload: {
      activedGroupKey: null,
    },
  });
  newState = setHistoryGroupKey(newState, {
    payload: {
      historyGroupKey: lodash.get(payload, 'historyGroupKey', null),
    },
  });
  newState = saveErrorInfo(newState, {
    payload: {
      errorInfo: {},
    },
  });
  return {
    ...newState,
    historyChangeTime: new Date().getTime(),
  };
}
