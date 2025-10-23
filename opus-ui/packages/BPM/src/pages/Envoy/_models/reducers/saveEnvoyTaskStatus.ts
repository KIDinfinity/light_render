import lodash from 'lodash';

interface IAction {
  payload: {
    taskStatus: string;
  };
}

export default function (state: any, { payload }: IAction) {
  return {
    ...state,
    ...lodash.pick(payload, ['taskStatus']),
  };
}
