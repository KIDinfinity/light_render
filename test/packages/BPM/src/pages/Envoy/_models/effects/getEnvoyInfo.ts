import lodash from 'lodash';
import moment from 'moment';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findReasonInfo, api } from '@/services/navigatorEnvoyControllerService';
import envoyReasonConfigControllerService from '@/services/envoyReasonConfigControllerService';
import { markReasonGroupRead } from '@/services/envoyReasonInfoControllerService';
import { safeParseUtil } from '@/utils/utils';
import { EModuleName, EReasonStatus } from 'bpm/pages/Envoy/enum';
import { transferToObj } from 'bpm/pages/Envoy/_utils/dataTransferFn';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import getCurRoleInfo from 'bpm/pages/Envoy/_utils/getCurRoleInfo';
import getTheReplacedWithTpl from 'bpm/pages/Envoy/_utils/getTheReplacedWithTpl';
import findReminderConfig from 'bpm/pages/Envoy/_utils/findReminderConfig';
import { v4 as uuidv4 } from 'uuid';
import AdvancedMenuKey from 'navigator/pages/AdvancedQuery/Enum/AdvancedMenuKey';

function* getEnvoyInfo({ signal }: any, { select, call, put }: any) {
  const { mainPageTaskId, mainPageCaseNo, caseNo, isCallFindReasonInfo } = yield select(
    (state: any) => state.envoyController
  );
  const currentAdvQueryTab = yield select((state: any) => state.advancedQueryAllForm.currentTab);

  const pathname = window.location.pathname;
  const taskIdParam = (() => {
    if (
      [
        AdvancedMenuKey.case,
        AdvancedMenuKey.nbhistoryinquiry,
        AdvancedMenuKey.claimhistory,
      ].includes(currentAdvQueryTab) &&
      /navigator\/advancedquery/.test(pathname)
    ) {
      return '';
    }
    return caseNo === mainPageCaseNo ? mainPageTaskId : '';
  })();
  const response = yield call(
    findReasonInfo,
    objectToFormData({
      caseNo,
      taskId: taskIdParam,
    }),
    { signal }
  );
  if (caseNo) yield call(markReasonGroupRead, objectToFormData({ caseNo }));
  yield put({
    type: 'saveState',
    payload: {
      isCallFindReasonInfo: !isCallFindReasonInfo,
    },
  });
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    const {
      activityKey,
      businessNo,
      inquiryBusinessNo,
      caseCategory,
      taskId,
      taskStatus,
      currentReasonGroups,
      historyReasonGroups,
      assignee,
    } = lodash.pick(lodash.get(response, 'resultData'), [
      'activityKey',
      'businessNo',
      'inquiryBusinessNo',
      'caseCategory',
      'taskId',
      'taskStatus',
      'currentReasonGroups',
      'historyReasonGroups',
      'assignee',
    ]);

    yield put({
      type: 'workspaceSwitchOn/saveTriggerModalData',
      payload: {
        taskId,
        triggerModalData: {
          [taskId]: {
            [api.findReasonInfo]: response,
          },
        },
      },
    });

    yield put.resolve({
      type: 'saveEnvoyInfo',
      payload: {
        activityKey,
        businessNo,
        inquiryBusinessNo,
        caseCategory,
        taskId,
        taskStatus,
        assignee,
      },
    });
    const envoyConfigResponse = yield call(envoyReasonConfigControllerService.listConfigs, {
      activityKey,
      caseCategory,
    });
    const envoyConfig = lodash.get(envoyConfigResponse, 'resultData', []);

    // 当前的ReasonGroup
    for (
      let groupIdx = 0, groupLen = currentReasonGroups?.length;
      groupIdx < groupLen;
      groupIdx += 1
    ) {
      const { groupCode, id: groupId, reasonDetails } = currentReasonGroups[groupIdx];
      // 权限注入
      const envoyAuth = yield put.resolve({
        type: 'authController/CheckGroupEnvoy',
        payload: {
          caseCategory,
          activityCode: activityKey,
          limitValue: groupCode,
        },
      });
      currentReasonGroups[groupIdx].envoyAuth = envoyAuth;

      for (
        let reasonIdx = 0, reasonLen = reasonDetails?.length;
        reasonIdx < reasonLen;
        reasonIdx += 1
      ) {
        // 设置一些前端使用的变量
        reasonDetails[reasonIdx].claimNo = businessNo;
        reasonDetails[reasonIdx].envoyAuth = envoyAuth;
        reasonDetails[reasonIdx].groupId = groupId;
        reasonDetails[reasonIdx].reasonIdx = reasonIdx;
        reasonDetails[reasonIdx].displayConfig = safeParseUtil(
          reasonDetails[reasonIdx]?.displayConfig
        );
        // 统一先做一次数据转化（send、resolve、waived时会将转化的数据还原）
        reasonDetails[reasonIdx] = transferToObj(reasonDetails[reasonIdx]);

        const sortModuleArr = getSortModuleArr(reasonDetails[reasonIdx]?.displayConfig);
        const hasMemo = lodash.some(
          sortModuleArr,
          (module: any) => module.moduleName === EModuleName.PendingMemo
        );

        if (reasonDetails[reasonIdx]?.pendingMemoList?.length) {
          const groupedData = lodash.groupBy(
            reasonDetails[reasonIdx]?.pendingMemoList,
            (memoItem) => memoItem.requestedClientRole + memoItem.requestedClientId
          );
          lodash.map(groupedData, (arr) => {
            const groupCodeOfItem =
              arr.find((memoItem) => memoItem.groupCode)?.groupCode || uuidv4();
            arr.map((memoItem) => (memoItem.groupCode = groupCodeOfItem));
          });
        }

        if (
          hasMemo &&
          reasonDetails[reasonIdx].status === EReasonStatus.DRAFT &&
          lodash.isEmpty(reasonDetails[reasonIdx]?.pendingMemoList)
        ) {
          reasonDetails[reasonIdx].pendingMemoList = [
            {
              memoCode: undefined,
              memoDesc: undefined,
              pendingDate: moment().format(),
              groupCode: uuidv4(),
            },
          ];
        }

        if (hasMemo) {
          const isReasonMemo = reasonDetails[reasonIdx].pendingMemoList.some(
            (memo) => memo.subTypeCode || memo.memoRemark
          );
          // 兼容remark的旧数据
          if (isReasonMemo) {
            reasonDetails[reasonIdx].pendingMemoList.map((memo) => {
              if (!memo.pendingMemoSubInfoList?.length) {
                memo.pendingMemoSubInfoList = [
                  {
                    id: uuidv4(),
                    subTypeCode: memo.subTypeCode,
                    subRemark: memo.memoRemark,
                  },
                ];
              }
            });
          }
        }

        // 将变量替换进模本中
        let destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
        let curDestRole =
          reasonDetails[reasonIdx]?.destRole || reasonDetails[reasonIdx]?.destRoleOpt[0];
        let roleInfoKey = `${businessNo}_${curDestRole}`;
        let curRoleInfo = getCurRoleInfo({
          businessNo,
          curDestRole,
          roleInfoKey,
          destRoleInfo,
        });
        if (!curRoleInfo) {
          yield put.resolve({
            type: 'getCurRoleInfo',
            payload: {
              curDestRole,
              roleInfoKey,
            },
          });
          destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
          curRoleInfo = lodash.get(destRoleInfo, roleInfoKey);
        }
        reasonDetails[reasonIdx] = getTheReplacedWithTpl(reasonDetails[reasonIdx], curRoleInfo);

        const { reasonReminders, reasonCode, startTime, period, displayConfig } =
          reasonDetails[reasonIdx];
        for (
          let reminderIdx = 0, reminderLen = reasonReminders?.length;
          reminderIdx < reminderLen;
          reminderIdx += 1
        ) {
          // 设置一些前端使用的变量
          reasonReminders[reminderIdx].claimNo = businessNo;
          reasonReminders[reminderIdx].groupId = groupId;
          reasonReminders[reminderIdx].envoyAuth = envoyAuth;
          reasonReminders[reminderIdx].reasonCode = reasonCode;
          reasonReminders[reminderIdx].startTime = startTime;
          reasonReminders[reminderIdx].period = period;
          reasonReminders[reminderIdx].reasonIdx = reasonIdx;
          reasonReminders[reminderIdx].reminderIdx = reminderIdx;
          reasonReminders[reminderIdx].displayConfig = lodash.get(
            displayConfig,
            'reminder.children'
          );
          // 统一先做一次数据转化（send、resolve、waived时会将转化的数据还原）
          reasonReminders[reminderIdx] = transferToObj(reasonReminders[reminderIdx]);

          // 将变量替换进模本中
          destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
          curDestRole =
            reasonReminders[reminderIdx]?.destRole || reasonReminders[reminderIdx]?.destRoleOpt[0];
          roleInfoKey = `${businessNo}_${curDestRole}`;
          curRoleInfo = getCurRoleInfo({
            businessNo,
            curDestRole,
            roleInfoKey,
            destRoleInfo,
          });
          if (!curRoleInfo) {
            yield put.resolve({
              type: 'getCurRoleInfo',
              payload: {
                curDestRole,
                roleInfoKey,
              },
            });
            destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
            curRoleInfo = lodash.get(destRoleInfo, roleInfoKey);
          }
          const reminderCode = lodash.get(reasonReminders[reminderIdx], 'reminderCode', '');
          const reminderConfig = findReminderConfig({
            configs: envoyConfig,
            groupCode,
            reasonCode,
            reminderCode,
          });
          reasonReminders[reminderIdx] = getTheReplacedWithTpl(
            reasonReminders[reminderIdx],
            curRoleInfo,
            reminderConfig
          );
        }
        reasonDetails[reasonIdx].reasonReminders = reasonReminders;
      }

      currentReasonGroups[groupIdx].reasonDetails = reasonDetails;
    }
    // 已经完结的ReasonGroup
    for (
      let groupIdx = 0, groupLen = historyReasonGroups?.length;
      groupIdx < groupLen;
      groupIdx += 1
    ) {
      const { groupCode, id: groupId, reasonDetails } = historyReasonGroups[groupIdx];

      // 权限注入
      const envoyAuth = yield put.resolve({
        type: 'authController/CheckGroupEnvoy',
        payload: {
          caseCategory,
          activityCode: activityKey,
          limitValue: groupCode,
        },
      });
      historyReasonGroups[groupIdx].envoyAuth = envoyAuth;

      for (
        let reasonIdx = 0, reasonLen = reasonDetails?.length;
        reasonIdx < reasonLen;
        reasonIdx += 1
      ) {
        // 设置一些前端使用的变量
        reasonDetails[reasonIdx].claimNo = businessNo;
        reasonDetails[reasonIdx].envoyAuth = envoyAuth;
        reasonDetails[reasonIdx].groupId = groupId;
        reasonDetails[reasonIdx].reasonIdx = reasonIdx;
        reasonDetails[reasonIdx].displayConfig = safeParseUtil(
          reasonDetails[reasonIdx]?.displayConfig
        );
        // 统一先做一次数据转化（send、resolve、waived时会将转化的数据还原）
        reasonDetails[reasonIdx] = transferToObj(reasonDetails[reasonIdx]);
        // 将变量替换进模本中
        let destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
        let curDestRole =
          reasonDetails[reasonIdx]?.destRole || reasonDetails[reasonIdx]?.destRoleOpt[0];
        let roleInfoKey = `${businessNo}_${curDestRole}`;
        let curRoleInfo = getCurRoleInfo({
          businessNo,
          curDestRole,
          roleInfoKey,
          destRoleInfo,
        });

        if (!curRoleInfo) {
          yield put.resolve({
            type: 'getCurRoleInfo',
            payload: {
              curDestRole,
              roleInfoKey,
            },
          });
          destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
          curRoleInfo = lodash.get(destRoleInfo, roleInfoKey);
        }
        reasonDetails[reasonIdx] = getTheReplacedWithTpl(reasonDetails[reasonIdx], curRoleInfo);
        const sortModuleArr = getSortModuleArr(reasonDetails[reasonIdx]?.displayConfig);
        const hasMemo = lodash.some(
          sortModuleArr,
          (module: any) => module.moduleName === EModuleName.PendingMemo
        );
        if (
          hasMemo &&
          reasonDetails[reasonIdx].status === EReasonStatus.DRAFT &&
          lodash.isEmpty(reasonDetails[reasonIdx]?.pendingMemoList)
        ) {
          reasonDetails[reasonIdx].pendingMemoList = [
            { memoCode: undefined, memoDesc: undefined, pendingDate: moment().format() },
          ];
        }

        const { reasonReminders, reasonCode, startTime, period, displayConfig } =
          reasonDetails[reasonIdx];
        for (
          let reminderIdx = 0, reminderLen = reasonReminders?.length;
          reminderIdx < reminderLen;
          reminderIdx += 1
        ) {
          // 设置一些前端使用的变量
          reasonReminders[reminderIdx].claimNo = businessNo;
          reasonReminders[reminderIdx].groupId = groupId;
          reasonReminders[reminderIdx].envoyAuth = envoyAuth;
          reasonReminders[reminderIdx].reasonCode = reasonCode;
          reasonReminders[reminderIdx].startTime = startTime;
          reasonReminders[reminderIdx].period = period;
          reasonReminders[reminderIdx].reasonIdx = reasonIdx;
          reasonReminders[reminderIdx].reminderIdx = reminderIdx;
          reasonReminders[reminderIdx].displayConfig = lodash.get(
            displayConfig,
            'reminder.children'
          );
          // 统一先做一次数据转化（send、resolve、waived时会将转化的数据还原）
          reasonReminders[reminderIdx] = transferToObj(reasonReminders[reminderIdx]);
          // 将变量替换进模本中
          destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
          curDestRole =
            reasonReminders[reminderIdx]?.destRole || reasonReminders[reminderIdx]?.destRoleOpt[0];
          roleInfoKey = `${businessNo}_${curDestRole}`;
          curRoleInfo = getCurRoleInfo({
            businessNo,
            curDestRole,
            roleInfoKey,
            destRoleInfo,
          });
          if (!curRoleInfo) {
            yield put.resolve({
              type: 'getCurRoleInfo',
              payload: {
                curDestRole,
                roleInfoKey,
              },
            });
            destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
            curRoleInfo = lodash.get(destRoleInfo, roleInfoKey);
          }
          const reminderCode = lodash.get(reasonReminders[reminderIdx], 'reminderCode', '');
          const reminderConfig = findReminderConfig({
            configs: envoyConfig,
            groupCode,
            reasonCode,
            reminderCode,
          });
          reasonReminders[reminderIdx] = getTheReplacedWithTpl(
            reasonReminders[reminderIdx],
            curRoleInfo,
            reminderConfig
          );
        }
        reasonDetails[reasonIdx].reasonReminders = reasonReminders;
      }
      historyReasonGroups[groupIdx].reasonDetails = reasonDetails;
    }

    yield put({
      type: 'saveGroupInfo',
      payload: {
        currentReasonGroups,
        currentReasonGroupsBackup: currentReasonGroups,
        historyReasonGroups,
      },
    });
  }
  return response;
}

export default getEnvoyInfo;
