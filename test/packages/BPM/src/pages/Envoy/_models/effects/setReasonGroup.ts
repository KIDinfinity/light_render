import lodash from 'lodash';
import moment from 'moment';
import envoyReasonInfoControllerService from '@/services/envoyReasonInfoControllerService';
import { safeParseUtil } from '@/utils/utils';
import { transferToObj } from 'bpm/pages/Envoy/_utils/dataTransferFn';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import getCurRoleInfo from 'bpm/pages/Envoy/_utils/getCurRoleInfo';
import getTheReplacedWithTpl from 'bpm/pages/Envoy/_utils/getTheReplacedWithTpl';
import { EModuleName, EReasonStatus } from 'bpm/pages/Envoy/enum';
import findReminderConfig from 'bpm/pages/Envoy/_utils/findReminderConfig';
import addUpdateDate from '@/utils/addUpdateDate';
import { listRequestClientInfo } from '@/services/envoyMemoControllerService';
import CustomerRole from 'basic/enum/CustomerRole';
import bpm from 'bpm/pages/OWBEntrance';
import { tenant } from '@/components/Tenant';
import { v4 as uuidv4 } from 'uuid';

interface IAction {
  payload: {
    groupIdx: number;
    groupCode: string;
  };
}

export default function* setReasonGroup({ payload }: IAction, { select, call, put }: any) {
  const { groupIdx, groupCode, id } = lodash.pick(payload, ['groupIdx', 'groupCode', 'id']);
  const {
    caseNo,
    businessNo,
    inquiryBusinessNo,
    activityKey,
    caseCategory,
    reasonConfigs,
    taskId,
    caseCategoryReasonConfigs,
  } = yield select((state: any) => state.envoyController);

  const currentReasonConfig = lodash
    .chain(reasonConfigs)
    .pickBy(lodash.isObject as any)
    .find({ code: groupCode })
    .value();
  const params = {
    ...lodash.pick(currentReasonConfig, [
      'allowActions',
      'stopSla',
      'stopTat',
      'name',
      'enableAutoPend',
      'emailBccEM',
      'emailCcEM',
      'emailContentEM',
      'emailTitleEM',
      'emailToEM',
      'smsContentEM',
      'smsToEM',
    ]),
    activityKey,
    caseCategory,
    caseNo,
    businessNo,
    inquiryBusinessNo,
    groupCode,
    currentActivityKey: activityKey,
    reasonDetails: lodash.map(lodash.get(currentReasonConfig, 'reasonConfigs'), (config: any) => {
      const displayConfig = safeParseUtil(config?.displayConfig);

      return {
        ...lodash.pick(config, [
          'caseRelationWithSubCase',
          'copyData',
          'enableAutoReminder',
          'enableReminder',
          'enableReminderNotice',
          'enableWorkday',
          'period',
          'reasonCode',
          'reasonName',
          'subCaseCategory',
          'type',
          'displayConfig',
          'triggerCcm',
          'triggerDocDispatch',
          'syncDestToReminder',
          'ccmSyncFlag',
        ]),
        channelDataList: lodash.map(
          lodash.get(config, 'roleChannelConfigs[0].channelTemplates'),
          (item: any) => ({
            channel: item?.channel,
            enable: item?.enable,
            content: item?.template,
          })
        ),
        defaultChannel: lodash.get(config, 'roleChannelConfigs[0].defaultChannel'),
        destRole: lodash.get(config, 'roleChannelConfigs[0].destRole'),
        destRoleOpt: lodash.map(
          lodash.get(config, 'roleChannelConfigs'),
          (item: any) => item?.destRole
        ),
        dispatchDate: moment().format(),
        policy:
          lodash.get(config, 'policy') ||
          JSON.stringify([
            {
              policyList: [],
              correspondenceRemark: '',
              otherReason: '',
              reasonList: [],
              date: '',
            },
          ]),
        attachment: lodash.get(config, 'attachment') || JSON.stringify(['']),
        payment: lodash.get(config, 'payment') || '',
        remark: lodash.get(config, 'remark') || '',
        delayLetter: lodash.isBoolean(config?.delayLetter)
          ? config?.delayLetter
          : !!displayConfig?.delayLetter?.visible,
        define: lodash.get(config, 'define') || '',
        letterCode: lodash.get(config, 'letterCode') || '',
        reasonReminders: lodash.map(
          lodash.get(config, 'reminderConfigs'),
          (reminderConfig: any) => ({
            dispatchDate: moment().format(),
            cron: lodash.get(reminderConfig, 'cron'),
            noticeLead: lodash.get(reminderConfig, 'noticeLead'),
            reminderCode: lodash.get(reminderConfig, 'reminderCode'),
            reminderSequence: lodash.get(reminderConfig, 'reminderSequence'),
            triggerCcm: !!lodash.get(reminderConfig, 'triggerCcm'),
            channelDataList: lodash.map(
              lodash.get(reminderConfig, 'roleChannelConfigs[0].channelTemplates'),
              (item: any) => ({
                channel: item?.channel,
                enable: item?.enable,
                content: item?.template,
              })
            ),
            defaultChannel: lodash.get(reminderConfig, 'roleChannelConfigs[0].defaultChannel'),
            destRole: lodash.get(reminderConfig, 'roleChannelConfigs[0].destRole'),
            destRoleOpt: lodash.map(
              lodash.get(reminderConfig, 'roleChannelConfigs'),
              (item: any) => item?.destRole
            ),
          })
        ),
        docGroupCodes: lodash
          .chain(config?.docConfigs)
          .map((doc: any) => doc?.docGroupCode)
          .uniq()
          .value(),
        reasonDocs: lodash.flattenDeep(
          lodash
            .map(config?.docConfigs, (doc: any) =>
              lodash
                .chain(doc?.defaultDocTypeCodes)
                .filter((item: any) => item.memoCode || item.memoSubcode)
                .map((typeCode: string) => ({
                  docTypeCode: typeCode,
                  ...lodash.pick(doc, ['docGroupCode', 'enableComment', 'enableCopies']),
                }))
                .value()
            )
            .filter((item: any) => item.length)
        ),
      };
    }),
    taskId,
    operationType: 'manual.add.envoy',
  };
  const res = yield call(envoyReasonInfoControllerService.draftReasonGroup, params);
  const resultData = lodash.get(res, 'resultData');
  if (lodash.isPlainObject(res) && res.success && lodash.isPlainObject(resultData)) {
    yield addUpdateDate(caseNo);
    const { groupCode: resultDataGroupCode, id: groupId, reasonDetails } = resultData;
    // 权限注入
    const envoyAuth = yield put.resolve({
      type: 'authController/CheckGroupEnvoy',
      payload: {
        caseCategory,
        activityCode: activityKey,
        limitValue: resultDataGroupCode,
      },
    });
    resultData.envoyAuth = envoyAuth;

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
      if (
        hasMemo &&
        reasonDetails[reasonIdx].status === EReasonStatus.DRAFT &&
        lodash.isEmpty(reasonDetails[reasonIdx]?.pendingMemoList)
      ) {
        const { defaultMemoCode, defaultMemoDesc } = reasonDetails[reasonIdx] || {};
        const hasMemoTo =
          reasonDetails[reasonIdx].displayConfig?.pendingMemo?.children?.memoClientRole?.visible;
        if (hasMemoTo) {
          const response = yield call(listRequestClientInfo, {
            businessNo,
            requestedClientRole: CustomerRole.PolicyOwner,
          });
          const list = response?.resultData || [];
          reasonDetails[reasonIdx].pendingMemoList =
            list.length === 1
              ? [
                  {
                    memoCode: defaultMemoCode,
                    memoDesc: defaultMemoDesc,
                    requestedClientRole: CustomerRole.PolicyOwner,
                    requestedClientId: list[0]?.requestedClientId,
                    id: uuidv4(),
                    pendingDate: moment().format(),
                  },
                ]
              : [
                  {
                    memoCode: defaultMemoCode,
                    memoDesc: defaultMemoDesc,
                    requestedClientRole: CustomerRole.PolicyOwner,
                    id: uuidv4(),
                    pendingDate: moment().format(),
                  },
                ];
        } else {
          reasonDetails[reasonIdx].pendingMemoList = [
            {
              memoCode: defaultMemoCode,
              memoDesc: defaultMemoDesc,
              id: uuidv4(),
              pendingDate: moment().format(),
            },
          ];
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
      yield bpm.buttonAction('save');
      if (!curRoleInfo || tenant.isPH()) {
        yield put.resolve({
          type: 'getCurRoleInfo',
          payload: {
            curDestRole,
            roleInfoKey,
            groupCode: resultDataGroupCode,
          },
        });
        destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
        curRoleInfo = lodash.get(destRoleInfo, roleInfoKey);
      }
      const { reasonReminders, reasonCode, startTime, period, displayConfig } = reasonDetails[
        reasonIdx
      ];
      const configs = caseCategoryReasonConfigs?.[caseCategory]?.find(
        (item) => item?.reasonCode === reasonCode
      );
      reasonDetails[reasonIdx] = getTheReplacedWithTpl(
        reasonDetails[reasonIdx],
        curRoleInfo,
        configs
      );

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
        reasonReminders[reminderIdx].displayConfig = lodash.get(displayConfig, 'reminder.children');
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
        const reminderConfig = findReminderConfig({
          configs: reasonConfigs,
          groupCode,
          reasonCode,
          reminderCode: reasonReminders[reminderIdx].reminderCode,
        });
        reasonReminders[reminderIdx] = getTheReplacedWithTpl(
          reasonReminders[reminderIdx],
          curRoleInfo,
          reminderConfig
        );
      }
      reasonDetails[reasonIdx].reasonReminders = reasonReminders;
    }
    resultData.reasonDetails = reasonDetails;

    yield put({
      type: 'saveReasonGroup',
      payload: {
        groupIdx,
        groupDetail: resultData,
        id,
      },
    });
    yield put({
      type: 'validateFields',
      payload: {
        dataId: resultData?.groupId,
      },
    });
  }
}
