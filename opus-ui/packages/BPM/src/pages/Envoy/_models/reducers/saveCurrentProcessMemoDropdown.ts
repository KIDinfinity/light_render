import lodash from 'lodash';

interface IAction {
  payload: {
    currentProcessMemoDropdown: any;
  };
}

export default function (state: any, { payload }: IAction) {
  return {
    ...state,
    currentProcessMemoDropdown: lodash.get(payload, 'currentProcessMemoDropdown', []),
  };
}
