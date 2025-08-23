import lodash from 'lodash';

interface IAction {
  payload: {
    reasonConfigs: any;
  }
}

export default function saveReasonConfigs(state: any, { payload }: IAction) {
  return {
    ...state,
    reasonConfigs: lodash.get(payload, 'reasonConfigs', []),
  };
}
