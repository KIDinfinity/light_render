import lodash from 'lodash';

interface IAction {
  payload: {
    groupIdx: number;
  };
}

export default function saveDelEnvoyResult(state: any, { payload }: IAction) {
  return {
    ...state,
    currentReasonGroups: lodash.filter(
      state.currentReasonGroups,
      (_: any, idx: number) => idx !== payload.groupIdx
    ),
    activedGroupKey: null,
  };
}
