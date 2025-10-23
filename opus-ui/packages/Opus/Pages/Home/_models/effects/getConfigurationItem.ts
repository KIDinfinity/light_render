import { ConfigurationMap, ModalTabs, TaskTabs } from 'packages/Opus/Enums';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { modalTab, taskKey } = payload || {};

  const configs = {
    [ModalTabs.myTeamTask]: {
      [TaskTabs.todo]: {
        categoryCode: ConfigurationMap.opusmyteamtask_todo,
        name: 'opusmyteamtask_todo',
      },
      [TaskTabs.pending]: {
        categoryCode: ConfigurationMap.opusmyteamtask_pending,
        name: 'opusmyteamtask_pending',
      },
    },
    [ModalTabs.myTask]: {
      [TaskTabs.todo]: {
        categoryCode: ConfigurationMap.opusmytask_todo,
        name: 'opusmytask_todo',
      },
      [TaskTabs.pending]: {
        categoryCode: ConfigurationMap.opusmytask_pending,
        name: 'opusmytask_pending',
      },
    },
    [ModalTabs.opusAdvancedsearch]: {
      default: {
        categoryCode: ConfigurationMap.opusadvancedsearch,
        name: 'opusadvancedsearch',
      },
    },
  };

  const { categoryCode, name } = !!configs?.[modalTab]?.default
    ? configs?.[modalTab]?.default
    : configs?.[modalTab]?.[taskKey] || {};

  yield put({
    type: 'saveConfigurationItem',
    payload: {
      categoryCode,
      name,
      modalTab,
      taskKey,
    },
  });
}
