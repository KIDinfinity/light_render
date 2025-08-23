import lodash from 'lodash';
import { taskGoBackNotProposal } from '@/utils/task';
import { ButtonCode } from 'bpm/enum';
import favoriteConfig from './config-favorite';
import action from '../ButtonAction/action';
import { ButtonStatus } from '../../constants';

const configActionDefault = async ({ taskId, contextDispatch }: any) => ({
  back: {
    action: () => {
      taskGoBackNotProposal();
    },
  },
  image: {
    isShowNotice: false,
    action: ({ taskDetail }: any) => {
      window.open(`/documentManage/${taskDetail.processInstanceId}`);
    },
  },
  eSubmission: {
    isShowNotice: false,
    action: ({ taskDetail }: any) => {
      window.open(`/submissionData/${taskDetail.processInstanceId}`);
    },
  },
  assign: {
    isShowNotice: false,
    action: ({ taskDetail, dispatch }: any) => {
      dispatch({
        type: 'contactsAssigneeList/openAssigneeList',
        payload: { taskDetail },
      });
      dispatch({
        type: 'contactsAssigneeList/getAssigneeList',
        payload: {
          taskDetail,
        },
      });
      dispatch({
        type: 'contactsAssigneeList/save',
        payload: {
          assignSourceType: 5,
        },
      });
      dispatch({
        type: 'chatController/changeSearchVisibleReducer',
        payload: {
          showSearchVisible: true,
        },
      });
    },
  },
  favorite: await favoriteConfig({ taskId, contextDispatch }),
});

const configList = async ({
  taskId,
  processInstanceId,
  customizationButtonConfig: extraButtonList,
  actionConfig: customActionList,
  buttonListFromServer,
  contextDispatch,
}: any) => {
  const serviceList = buttonListFromServer;
  let mergedButtonUIList = (() => {
    const params = new URL(document.location).searchParams;
    const afterHook = params.get('afterHook');
    const list = [...serviceList, ...extraButtonList];
    if (afterHook === 'closeWin') {
      return list;
    }
    return [
      ...list,
      {
        buttonCode: ButtonCode.Back,
        buttonId: ButtonCode.Back,
      },
    ];
  })();
  mergedButtonUIList = lodash.unionBy(mergedButtonUIList, 'buttonCode');
  const defaultActionConfig = await configActionDefault({
    taskId,
    processInstanceId,
    contextDispatch,
  });
  const mergedButtonActionList = lodash.cloneDeep(customActionList);
  lodash
    .chain(mergedButtonActionList)
    .entries()
    .forEach(([key, value]) => {
      mergedButtonActionList[key] = lodash.merge({}, lodash.get(defaultActionConfig, key), value);
    })
    .value();
  lodash
    .chain(defaultActionConfig)
    .entries()
    .forEach(([key, value]) => {
      if (lodash.isEmpty(mergedButtonActionList[key])) {
        mergedButtonActionList[key] = value;
      }
    })
    .value();
  return lodash.map(mergedButtonUIList, (item) => ({
    ...item,
    ...mergedButtonActionList[item.buttonCode],
    getDataAction: mergedButtonActionList[item.buttonCode]?.action,
  }));
};

export default async ({
  taskId,
  taskDetail,
  claimStates,
  customizationButtonConfig,
  actionConfig,
  dispatch,
  contextDispatch,
  buttonListFromServer = [],
  commonActionLife,
}: any) => {
  return lodash
    .chain(
      await configList({
        taskId,
        processInstanceId: taskDetail?.processInstanceId,
        customizationButtonConfig,
        actionConfig,
        buttonListFromServer,
        contextDispatch,
      })
    )
    .filter((item) => lodash.isPlainObject(item))
    .map((buttonConfig) => {
      const mergeConfig = {
        ...buttonConfig,
        status: buttonConfig.initStatus || ButtonStatus.Default,
      };
      return {
        ...buttonConfig,
        key: buttonConfig.buttonId,
        buttonCode: buttonConfig.buttonCode,
        title: buttonConfig.title,
        icon: buttonConfig.icon,
        className: buttonConfig.className,
        type: buttonConfig.type,
        onChange: buttonConfig.onChange,
        errorsCount: buttonConfig.errorsCount,
        action: async ({ isShowNotice: notice, isAuto, ...rest }: any) => {
          await action({
            taskId,
            taskDetail,
            claimStates,
            buttonConfig: mergeConfig,
            dispatch,
            contextDispatch,
            isShowNotice: lodash.isBoolean(notice) ? notice : buttonConfig.isShowNotice,
            isAuto,
            commonActionLife,
            ...rest,
          });
        },
        timer: buttonConfig.timer,
      };
    })
    .value();
};
