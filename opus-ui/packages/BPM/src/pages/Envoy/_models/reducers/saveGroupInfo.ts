import lodash from 'lodash';

interface IAction {
  currentReasonGroups: any;
  currentReasonGroupsBackup: any;
  historyReasonGroups: any;
}

export default function (state: any, { payload }: IAction) {
  return {
    ...state,
    ...lodash.pick(payload, [
      'currentReasonGroups',
      'currentReasonGroupsBackup',
      'historyReasonGroups',
    ]),
  };
}
