import lodash from 'lodash';
import envoyTemplateControllerService from '@/services/envoyTemplateControllerService';
import { tplArgReg, argCtnReg } from 'bpm/pages/Envoy/_utils/regExp';
import findReminderConfig from 'bpm/pages/Envoy/_utils/findReminderConfig';
import getTemplateByRoleAndChannel from 'bpm/pages/Envoy/_utils/getTemplateByRoleAndChannel';
import replaceTemplateParams from 'bpm/pages/Envoy/_utils/replaceTemplateParams';

interface IAction {
  payload: {
    to: string;
    ctn: any;
    groupCode: string;
  };
}

export default function* changeReminderDestInfo({ payload }: IAction, { call, select, put }: any) {
  const { to, ctn, groupCode } = payload;
  const {
    caseNo,
    inquiryBusinessNo,
    businessNo,
    caseCategory,
    destRoleInfo,
    reasonConfigs,
    taskId,
    activityKey: activityCode,
  } = yield select((state: any) =>
    lodash.pick(state.envoyController, [
      'caseNo',
      'inquiryBusinessNo',
      'businessNo',
      'caseCategory',
      'destRoleInfo',
      'reasonConfigs',
      'taskId',
      'activityKey',
    ])
  );
  let currentRoleInfo: any[];
  if (!businessNo || !ctn.destRole) {
    currentRoleInfo = [];
  } else {
    const roleInfoKey = `${businessNo}_${ctn.destRole}`;
    currentRoleInfo = lodash.get(destRoleInfo, roleInfoKey);
    if (!currentRoleInfo) {
      const params: any = {
        role: ctn.destRole,
        businessNo,
        claimNo: businessNo,
        caseCategory,
        caseNo,
        inquiryBusinessNo,
        taskId,
        activityCode,
      };
      switch (ctn.destRole) {
        case 'Agent':
          params.type = 'AGT';
          break;
        case 'Underwriter':
          params.type = 'UW';
          break;
        case 'AssessmentTeamLeader':
          params.roleCode = 'ROL004';
          break;
        default:
          break;
      }
      const paramDataResponse = yield call(envoyTemplateControllerService.getParamData, params);
      if (
        lodash.isPlainObject(paramDataResponse) &&
        paramDataResponse.success &&
        lodash.isArray(paramDataResponse.resultData)
      ) {
        const resultData = lodash.get(paramDataResponse, 'resultData');
        yield put.resolve({
          type: 'saveDestRoleInfo',
          payload: {
            roleInfoKey,
            roleInfo: resultData?.filter((item: any) => !lodash.isEmpty(item?.fullName)),
          },
        });
        currentRoleInfo = resultData;
      } else {
        currentRoleInfo = [];
      }
    }
  }

  ctn.dest = to;

  const { channelDataList, startTime, period, reasonCode, reminderCode } = lodash.pick(ctn, [
    'channelDataList',
    'startTime',
    'period',
    'reasonCode',
    'reminderCode',
  ]);
  const reminderConfig = findReminderConfig({
    configs: reasonConfigs,
    groupCode,
    reasonCode,
    reminderCode,
  });

  const userInfo =
    (lodash.chain(currentRoleInfo).pickBy(lodash.isObject) as any)
      .find({ fullName: ctn.dest })
      .value() || {};
  const tplArg = {
    startTime,
    period,
    ...userInfo,
  };

  const newChannelData = lodash.cloneDeep(channelDataList);
  for (let channelIdx = 0; channelIdx < newChannelData?.length; channelIdx += 1) {
    const content = lodash.get(newChannelData, `[${channelIdx}].content`, '');
    const channel = lodash.get(newChannelData, `[${channelIdx}].channel`, '');
    if (content) {
      const template = getTemplateByRoleAndChannel({
        config: reminderConfig,
        role: ctn.destRole,
        channel,
      });
      const { info, content: detail } = content;
      lodash.mapKeys(info, (tplVal, tplKey) => {
        if (!lodash.isEmpty(tplVal)) {
          let argVal = '{{}}';
          if (lodash.isString(tplArg[tplKey])) {
            argVal = `{{${tplArg[tplKey]}}}`;
          }
          const templateItem = lodash.get(template, `info.${tplKey}`);
          if (templateItem) {
            info[tplKey] = replaceTemplateParams({
              template: templateItem,
              values: tplArg,
            });
          } else {
            info[tplKey] = tplVal.replace(tplArgReg, argVal);
          }
        }
      });
      lodash.set(content, 'info', info);
      const detailObj = lodash.isPlainObject(detail)
        ? detail
        : {
            value: detail,
            argMapObj: {},
          };
      if (lodash.isString(detailObj?.value)) {
        const temporaryArgMapObj = {};
        detailObj.value = detailObj?.value.replace(tplArgReg, (matchVal: string) => {
          const argCtn = matchVal?.match(argCtnReg);
          let argKey = lodash.isArray(argCtn) ? argCtn[0] : '';
          if (detailObj.argMapObj[argKey]) {
            argKey = detailObj.argMapObj[argKey];
          }
          let viewVal;
          if (argKey === 'remainingDays') {
            viewVal = tplArg.period;
          } else if (argKey === 'expireDate') {
            const startDay = new Date();
            const expireDate = new Date(
              startDay.getTime() + tplArg.period * (24 * 60 * 60 * 1000) // 经过多少毫秒
            );
            viewVal = expireDate.toLocaleDateString();
          } else {
            viewVal = tplArg[argKey] || `${argKey}`;
          }
          temporaryArgMapObj[viewVal] = argKey;
          return `{{${viewVal}}}`;
        });
        detailObj.argMapObj = temporaryArgMapObj;
      }
      lodash.set(content, 'content', detailObj);
      lodash.set(newChannelData, `[${channelIdx}].content`, content);
    }
  }
  ctn.channelDataList = newChannelData;
  yield put({
    type: 'saveReminderDestInfo',
    payload: {
      data: ctn,
    },
  });
}
