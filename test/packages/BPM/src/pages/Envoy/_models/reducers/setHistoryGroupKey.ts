import lodash from 'lodash';

interface IAction {
  payload: {
    historyGroupKey: number | null;
  };
}

export default function (state: any, { payload }: IAction) {
  return {
    ...state,
    historyGroupKey: lodash.get(payload, 'historyGroupKey', null),
  };
}
