import { useSelector } from 'dva';

import { useMemo } from 'react';

import { ConfigurationMap, ModalTabs, TaskTabs } from 'opus/Enums';

export default ({ modalTabs, myTaskTab }: any) => {
  const configuration =
    useSelector(({ configController }: any) => configController?.configuration) || {};

  const taskTabConfig = {
    [TaskTabs.todo]: {
      categoryCode: ConfigurationMap.opusmytask_todo,
      configName: 'opusmytask_todo',
    },
    [TaskTabs.pending]: {
      categoryCode: ConfigurationMap.opusmytask_pending,
      configName: 'opusmytask_pending',
    },
  };
  const modalTabConfig = {
    [ModalTabs.myTeamTask]: {
      [TaskTabs.todo]: {
        categoryCode: ConfigurationMap.opusmyteamtask_todo,
        configName: 'opusmyteamtask_todo',
      },
      [TaskTabs.pending]: {
        categoryCode: ConfigurationMap.opusmyteamtask_pending,
        configName: 'opusmyteamtask_pending',
      },
    },
    [ModalTabs.myTask]: {
      ...taskTabConfig,
    },
    [ModalTabs.opusAdvancedsearch]: {
      categoryCode: ConfigurationMap.opusadvancedsearch,
      configName: 'opusadvancedsearch',
    },
    [ModalTabs.opusQualityControl]: {
      [TaskTabs.todo]: {
        categoryCode: ConfigurationMap.opusqualitycontrol_todo,
        configName: 'opusqualitycontrol_todo',
      },
      [TaskTabs.pending]: {
        categoryCode: ConfigurationMap.opusqualitycontrol_pending,
        configName: 'opusqualitycontrol_pending',
      },
    },
    [ModalTabs.opusMyTeamQualityControl]: {
      categoryCode: ConfigurationMap.opusmyteamqualitycontrol_todo,
      configName: 'opusmyteamqualitycontrol_todo',
    },
    [ModalTabs.opusMyQualityControl]: {
      categoryCode: ConfigurationMap.opusmyqualitycontrol_todo,
      configName: 'opusmyqualitycontrol_todo',
    },
    [ModalTabs.opusMyTeamPostProcessing]: {
      categoryCode: ConfigurationMap.opusmyteampostprocessing_todo,
      configName: 'opusmyteampostprocessing_todo',
    },
    [ModalTabs.opusMyPostProcessing]: {
      categoryCode: ConfigurationMap.opusmypostprocessing_todo,
      configName: 'opusmypostprocessing_todo',
    },
  };
  return useMemo(() => {
    const empty = {
      resultConfigs: [],
      searchConfigs: [],
      categoryCode: '',
      configName: '',
    };
    if (!modalTabs && !myTaskTab) return empty;
    const config = !modalTabs
      ? taskTabConfig?.[myTaskTab]
      : !!myTaskTab
        ? modalTabConfig?.[modalTabs]?.[myTaskTab]
        : modalTabConfig?.[modalTabs];

    if (!!config) {
      const { categoryCode, configName, duration } = config;
      return {
        resultConfigs: configuration?.[configName]?.resultField || [],
        searchConfigs: configuration?.[configName]?.inquiryField || [],
        categoryCode,
        configName,
        duration,
      };
    }
    return empty;
  }, [modalTabs, myTaskTab, configuration]);
};
