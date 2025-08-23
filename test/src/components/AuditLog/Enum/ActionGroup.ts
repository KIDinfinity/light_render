import Action from './Action';
import Group from './Group';

const ActionGroup = {
  [Group.Task]: {
    [Action.ReAssessment]: Action.ReAssessment,
    [Action.MarkDocArrived]: Action.MarkDocArrived,
    [Action.Assign]: Action.Assign,
  },
  [Group.Case]: {
    [Action.MarkUrgent]: Action.MarkUrgent,
    [Action.MarkUnUrgent]: Action.MarkUnUrgent,
    [Action.CancelCase]: Action.CancelCase,
  },
  [Group.Button]: {
    [Action.Submit]: Action.Submit,
    [Action.Reject]: Action.Reject,
    [Action.Pend]: Action.Pend,
    [Action.Resume]: Action.Resume,
    [Action.Withdrawal]: Action.Withdrawal,
    [Action.Split]: Action.Split,
    [Action.Save]: Action.Save,
  },
  [Group.Information]: {
    [Action.AddInformation]: Action.AddInformation,
  },
  [Group.Envoy]: {
    [Action.SendPending]: Action.SendPending,
    [Action.SendReminder]: Action.SendReminder,
    [Action.ResolvePending]: Action.ResolvePending,
    [Action.WaivePending]: Action.WaivePending,
    [Action.TurnOnReminder]: Action.TurnOnReminder,
    [Action.TurnOffReminder]: Action.TurnOffReminder,
  },
};

export default ActionGroup;
