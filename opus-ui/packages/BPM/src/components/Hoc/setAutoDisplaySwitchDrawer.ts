import lodash from 'lodash';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';
import CaseCategory from 'enum/CaseCategory';
import TaskDefKey from 'enum/TaskDefKey';

const handleRules = (taskDetail: any) => {
  /**
   * 配置对应的流程节点，满足options，返回打开侧边栏某个模块，
   */
  const rules = [
    {
      caseCategory: [
        CaseCategory.TH_CLM_CTG001,
        CaseCategory.TH_CLM_CTG002,
        CaseCategory.HK_CLM_CTG001,
        CaseCategory.HK_CLM_CTG002,
        CaseCategory.JP_CLM_CTG002,
        CaseCategory.JP_CLM_CTG001,
      ],
      taskDefKey: [
        TaskDefKey.TH_CLM_ACT004,
        TaskDefKey.TH_CLM_ACT001,
        TaskDefKey.HK_CLM_ACT003,
        TaskDefKey.HK_CLM_ACT001,
        TaskDefKey.JP_CLM_ACT001,
        TaskDefKey.JP_CLM_ACT003,
      ],
      options: {
        rejected: true,
        taskStatus: 'todo',
      },
      switchTab: SwitchDrawerTab.Remark,
      contentItem: ['reject'],
    },
    {
      caseCategory: [
        CaseCategory.TH_CLM_CTG001,
        CaseCategory.TH_CLM_CTG002,
        CaseCategory.HK_CLM_CTG001,
        CaseCategory.HK_CLM_CTG002,
        CaseCategory.JP_CLM_CTG002,
        CaseCategory.JP_CLM_CTG001,
      ],
      taskDefKey: [
        TaskDefKey.TH_CLM_ACT004,
        TaskDefKey.TH_CLM_ACT001,
        TaskDefKey.HK_CLM_ACT003,
        TaskDefKey.HK_CLM_ACT001,
        TaskDefKey.JP_CLM_ACT001,
        TaskDefKey.JP_CLM_ACT003,
      ],
      options: {
        taskStatus: 'todo',
      },
      switchTab: SwitchDrawerTab.Remark,
      contentItem: ['stpResult'],
    },
    {
      caseCategory: [CaseCategory.BP_SRV_CTG001, CaseCategory.BP_SRV_CTG002],
      taskDefKey: [TaskDefKey.BP_SRV_ACT002],
      options: {
        taskStatus: 'todo',
      },
      switchTab: SwitchDrawerTab.Remark,
    },
  ];

  return lodash.find(rules, (o: any) => {
    return (
      lodash.includes(o?.caseCategory, taskDetail?.caseCategory) &&
      lodash.includes(o?.taskDefKey, taskDetail?.activityKey) &&
      lodash.every(o?.options, (value, key) => value === taskDetail?.[key])
    );
  });
};

/**
 * 自动打开侧边栏
 * @param dispatch
 * @param taskDetail
 */
export default (dispatch: any, taskDetail: any) => {
  const result: any = handleRules(taskDetail);

  if (!result) return;

  dispatch({
    type: 'workspaceSwitchOn/changeSwitch',
    payload: {
      name: result?.switchTab || '',
    },
  });

  dispatch({
    type: 'navigatorInformationController/setActivityHistoryPanel',
    payload: {
      activityHistoryPanel: result?.contentItem || [],
    },
  });
  dispatch({
    type: 'navigatorInformationController/setActivityHistoryItem',
    payload: {
      activityHistoryItem: result?.contentItem || [],
    },
  });
};
