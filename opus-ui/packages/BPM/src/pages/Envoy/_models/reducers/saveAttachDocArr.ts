import lodash from 'lodash';

interface IAction {
  payload: {
    attachDocArr: any;
  };
}

export default function (state: any, { payload }: IAction) {
  return {
    ...state,
    attachDocArr: lodash.get(payload, 'attachDocArr'),
  };
};;
