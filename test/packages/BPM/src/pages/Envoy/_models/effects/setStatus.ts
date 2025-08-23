import lodash from 'lodash';
import envoyReasonInfoControllerService from '@/services/envoyReasonInfoControllerService';
import navigatorEnvoyControllerService from '@/services/navigatorEnvoyControllerService';
import { Action } from '@/components/AuditLog/Enum';
import bpm from 'bpm/pages/OWBEntrance';
import { EAllowActions, ETaskStatus } from 'bpm/pages/Envoy/enum';
import type { TAllowActions } from 'bpm/pages/Envoy/type';
import { transferToJson, argToVal } from 'bpm/pages/Envoy/_utils/dataTransferFn';
import addUpdateDate from '@/utils/addUpdateDate';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import checkPendingMemoList from 'bpm/pages/Envoy/_utils/checkPendingMemoList';

interface IAction {
  payload: {
    groupIdx: number;
    status: TAllowActions;
    isAuto: boolean;
    taskDetail: object;
  };
}
const mapSetStatusFn = {
  Save: envoyReasonInfoControllerService.saveReasonGroup,
  Waive: navigatorEnvoyControllerService.waiveReasonGroup,
  Resolve: navigatorEnvoyControllerService.resolveReasonGroup,
};
const ActionLog = {
  Waive: Action.WaivePending,
  Resolve: Action.ResolvePending,
};

function* setStatus({ payload }: IAction, { select, call, put }: any) {
  const { groupIdx, status, isAuto } = lodash.pick(payload, [
    'groupIdx',
    'status',
    'isAuto',
    'taskDetail',
  ]);

  const {
    activityKey,
    caseNo,
    currentReasonGroups,
    historyReasonGroups,
    destRoleInfo,
    businessNo,
    reasonConfigs,
  } = yield select((state: any) => ({
    ...lodash.pick(state?.envoyController, [
      'activityKey',
      'caseNo',
      'currentReasonGroups',
      'historyReasonGroups',
      'mainPageCaseNo',
      'mainPageTaskId',
      'destRoleInfo',
      'businessNo',
      'reasonConfigs',
    ]),
  }));

  const currentReasonGroup = lodash.cloneDeep(lodash.get(currentReasonGroups, [groupIdx]));
  lodash.forEach(currentReasonGroup?.reasonDetails, (reasonDetail: any, reasonIdx: number) => {
    currentReasonGroup.reasonDetails[reasonIdx] = transferToJson(reasonDetail);
    lodash.forEach(reasonDetail?.reasonReminders, (reasonReminder: any, reminderIdx) => {
      currentReasonGroup.reasonDetails[reasonIdx].reasonReminders[reminderIdx] =
        transferToJson(reasonReminder);
    });
  });

  const currentReasonConfig = lodash
    .chain(reasonConfigs)
    .pickBy(lodash.isObject as any)
    .find({ code: currentReasonGroup?.groupCode })
    .value();

  const hasError = yield put.resolve({
    type: 'validateStatus',
    payload: {
      currentReasonGroup,
      status,
    },
  });

  if (hasError) return;
  const newCurrentReasonGroup = {
    ...currentReasonGroup,
    reasonDetails: lodash.map(currentReasonGroup?.reasonDetails, (reasonDetail: any) => {
      const roleInfoKey = `${businessNo}_${reasonDetail.destRole}`;
      const roleInfoList = lodash.get(destRoleInfo, roleInfoKey);
      return {
        ...reasonDetail,
        channelDataList: argToVal(reasonDetail.channelDataList),
        reasonReminders: lodash.map(reasonDetail.reasonReminders, (el: any) => ({
          ...el,
          channelDataList: argToVal(el.channelDataList),
        })),
        destId:
          lodash
            .chain(roleInfoList)
            .find((el: any) => el.fullName === reasonDetail.dest)
            .get('userId')
            .value() || '',
        pendingMemoList: lodash.map(reasonDetail?.pendingMemoList, (memo: any) => {
          const { memoSeq, memoStatus, ...rest } = memo;
          if (status === EAllowActions.SAVE) {
            return rest;
          }
          return memo;
        }),
      };
    }),
    ...lodash.pick(currentReasonConfig, [
      'emailBccEM',
      'emailCcEM',
      'emailContentEM',
      'emailTitleEM',
      'emailToEM',
      'smsContentEM',
      'smsToEM',
    ]),
  };

  if (mapSetStatusFn[status]) {
    let service = mapSetStatusFn[status];

    if (
      status === 'Waive' &&
      !lodash.isEmpty(newCurrentReasonGroup?.reasonDetails?.[0]?.subCaseNo)
    ) {
      const result = yield new Promise((resolve) => {
        handleWarnMessageModal(
          [
            {
              code: formatMessageApi({
                Label_COM_WarningMessage: 'MSG_001168',
              }),
              content: formatMessageApi({
                Label_COM_WarningMessage: 'MSG_001168',
              }),
            },
          ],
          {
            okFn: async () => {
              resolve(true);
            },
            cancelFn: async () => {
              resolve(false);
            },
          }
        );
      });
      if (!result) {
        return currentReasonGroup;
      }
    }
    if (status === 'Save' && isAuto) {
      service = envoyReasonInfoControllerService.autoSaveReasonGroup;
    }
    const res = yield call(service, {
      ...newCurrentReasonGroup,
      currentActivityKey: activityKey,
    });

    if (lodash.isPlainObject(res) && res.success) {
      yield addUpdateDate(caseNo);
      const taskStatus = yield select((state: any) => state.envoyController.taskStatus);
      if (!(status === 'Save' && isAuto)) {
        yield put.resolve({
          type: 'getEnvoyInfo',
        });
      }
      if (status === EAllowActions.SAVE) {
        const groupDetail = yield select(
          (state: any) => state.envoyController.currentReasonGroups[groupIdx]
        );

        const allMemoStatus =
          groupDetail.reasonDetails[0].pendingMemoList?.reduce((result: any, item: any) => {
            if (item?.id) {
              result[item?.id] = item.memoStatus;
            }
            return result;
          }, {}) || {};
        const pendingMemoList = lodash
          .chain(res)
          .get('resultData.reasonDetails[0].pendingMemoList', [])
          .map((item: any) => {
            return {
              ...item,
              memoStatus: allMemoStatus[item?.id] ? allMemoStatus[item?.id] : item.memoStatus,
            };
          })
          .value();
        const { currentReasonGroups: currentReasonGroupsSnapshot } = yield select((state: any) => ({
          ...lodash.pick(state?.envoyController, ['currentReasonGroups']),
        }));
        const isCanUpdatePendingMemoList = checkPendingMemoList(
          currentReasonGroupsSnapshot?.[groupIdx],
          pendingMemoList
        );
        if (isCanUpdatePendingMemoList) {
          yield put({
            type: 'setPendingMemoList',
            payload: {
              groupIdx,
              pendingMemoList,
            },
          });
        }
      }
      if (status !== EAllowActions.SAVE) {
        if (taskStatus === ETaskStatus.PENDING) {
          bpm.reload();
        }
        yield put({
          type: 'setFocusToNewHistoryItem',
          payload: {
            historyGroupKey: historyReasonGroups?.length,
          },
        });

        /* 更新processJobInfo*/
        yield put({
          type: 'saveGetProcessJobInfoTimeStamp',
        });
      }

      if (status === EAllowActions.Resolve) {
        if (!!res?.resultData?.needRefreshPremium) {
          yield put({
            type: 'premiumSettlement/saveNeedRefreshPremium',
            payload: { needRefreshPremium: true },
          });
        }
      }

      /*  --auditLog--  */
      if (ActionLog[status]) {
        const { name } = lodash.pick(currentReasonGroup, ['name']);
        yield put({
          type: 'auditLogController/logEnvoy',
          payload: {
            action: ActionLog[status],
            caseNo,
            currentActivityKey: activityKey,
            desc: name,
          },
        });
      }
      // 更改 manualUnderwriting/premiumSettlement 流程的 ntu date
      if (res?.resultData?.ntuDate) {
        yield put.resolve({
          type: 'manualUnderwriting/updateNtuDate',
          payload: {
            ntuDate: res?.resultData?.ntuDate,
          },
        });
        yield put.resolve({
          type: 'premiumSettlement/updateNtuDate',
          payload: {
            ntuDate: res?.resultData?.ntuDate,
          },
        });
      }

      if (!lodash.isEmpty(res?.resultData?.id)) {
        yield put({
          type: 'solutionRead/setReadItem',
          payload: { subjectIdList: [res?.resultData?.id], subjectType: ESubjectType.ENVOY },
        });
      }
    }

    return res?.resultData;
  }
}
export default setStatus;
