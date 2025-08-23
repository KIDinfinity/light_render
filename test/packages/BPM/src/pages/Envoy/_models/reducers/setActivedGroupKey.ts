import lodash from 'lodash';

interface IAction {
  payload: {
    activedGroupKey: number | null;
  };
}

export default function (state: any, { payload }: IAction) {
  return {
    ...state,
    activedGroupKey: lodash.get(payload, 'activedGroupKey', null),
  };
}
