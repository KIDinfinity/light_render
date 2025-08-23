import lodash from 'lodash';
import request from '@/utils/request';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import getVeriables from './getVeriables';
import addDefaultAction from './addDefaultAction';
import handleError from './handleError';
import triggerSnapshotHook from './triggerSnapshotHook';
import dataCompare from './dataCompare';

export default async ({
  taskId,
  taskDetail,
  claimStates,
  buttonConfig,
  dispatch,
  blockIndex = 0,
  autoActionDataCache,
  setAutoActionDataCache,
  isAuto,
  extraParams,
}: any) => {
  const serviceList = lodash.get(buttonConfig, 'activityButtonServiceList', []);
  const actionCustomerConfig = lodash.get(buttonConfig, 'action.services', {});
  // TODO 为了处理prod 环境下snapshot Save错误，暂时这样处理
  if (buttonConfig.buttonCode === 'save') {
    const href = window.location.href;
    if (!href.includes('task/detail')) {
      return { success: false, variables: {}, responseCollect: {}, version: null, pageGone: true };
    }
  }

  let params = {};
  if (lodash.isFunction(buttonConfig.getDataAction)) {
    params = await buttonConfig.getDataAction({
      taskDetail,
      claimStates,
      dispatch,
      buttonConfig,
      allveriables: lodash.map(serviceList, (item) => getVeriables(item?.buttonParams)),
      isAuto,
    });
  }

  const responseCollect = {};
  let variables: any = {};
  // 是否最后执行成功
  let finalSuccessResult = true;
  let version = null;
  for (let i = blockIndex; i < serviceList.length; i += 1) {
    const service = serviceList[i];
    const { buttonServiceOrder, buttonServiceUrl, triggerSnapshot } = service;
    const cacheKey = `${taskId}_${buttonConfig.buttonCode}_${buttonServiceOrder}`;
    const defafultCurrentOrderCustomerConfig = actionCustomerConfig[buttonServiceOrder];
    const mergeCurrentOrderCustomerConfig = addDefaultAction({
      defaultConfig: defafultCurrentOrderCustomerConfig,
      serviceItem: serviceList[i],
      taskId,
      taskDetail,
    });
    const getDataForSubmit = lodash.get(mergeCurrentOrderCustomerConfig, 'getDataForSubmit');
    if (buttonServiceUrl) {
      let data: any = {};
      if (lodash.get(params, buttonServiceOrder)) {
        data = params[buttonServiceOrder];
      }
      if (data === requestHandleType.continue) {
        // eslint-disable-next-line
        continue;
      }
      if (data === requestHandleType.break) {
        finalSuccessResult = false;
        break;
      }
      if (lodash.isFunction(getDataForSubmit)) {
        // eslint-disable-next-line no-await-in-loop
        const dataFromConfig = await getDataForSubmit({
          actionServiceConfigItem: buttonConfig,
          claimStates,
          dispatch,
          taskDetail,
        });
        if (!(data instanceof FormData)) {
          data = lodash.merge({}, dataFromConfig, data, extraParams);
        } else {
          lodash
            .chain({})
            .assign(dataFromConfig, extraParams)
            .entries()
            .forEach(([key, value]) => {
              data.append(key, value);
            })
            .value();
        }
      }

      let response: any = {};

      if (
        data !== false &&
        isAuto &&
        dataCompare({ data, cacheData: autoActionDataCache?.get(cacheKey) })
      ) {
        // eslint-disable-next-line no-continue
        continue;
      }

      // 为了兼容自动save业务数据和流程节点匹配不上存了所务的snapshot数据的情况
      if (!!isAuto) {
        const { taskId: newTaskId } = JSON.parse(data?.snapshotDataList?.[0]?.dataValue || '{}');
        if (!!newTaskId && newTaskId !== data?.taskId) {
          break;
        }
      }

      // 为了解决请求还没有回来导致拿到错的版本
      const snapshotData = data?.snapshotDataList?.[0] || {};
      if (lodash.includes(['Save', 'AutoSave'], snapshotData.optionType)) {
        await dispatch({
          type: 'task/saveSavingVersion',
          payload: { savingVersionNo: snapshotData?.version?.versionNo },
        });
      }
      if (data !== false) {
        let serviceProcessed = false;
        // 自定义处理button service的hook
        if (!!buttonConfig.customProcessService) {
          const { customProcessService } = buttonConfig;
          const result = await customProcessService({
            taskDetail,
            data,
            dispatch,
            buttonConfig,
            service,
          });
          serviceProcessed = result.processed;
          response = result.response;
        }
        if (!serviceProcessed) {
          // eslint-disable-next-line no-await-in-loop
          response = await request(buttonServiceUrl, {
            method: 'POST',
            body: data,
          });
        }
        responseCollect[i + 1] = response;
      }

      const success = lodash.get(response, 'success', false);
      if (!success) {
        finalSuccessResult = false;
        handleError({
          response,
          buttonCode: 'cancelWarning',
          activityCode: taskDetail?.taskDefKey,
          activityStatus: taskDetail?.taskStatus,
          caseCategory: taskDetail?.caseCategory,
          caseNo: taskDetail?.processInstanceId,
          taskId,
          dispatch,
        });
        break;
      }
      if (success) {
        variables = response?.resultData?.businessData?.variables || {};
      }
      version = data?.snapshotDataList?.[0]?.version || version;

      if (lodash.includes(['Save', 'AutoSave'], snapshotData.optionType)) {
        await dispatch({
          type: 'task/saveSavingVersion',
          payload: { savingVersionNo: '', currentVersion: version?.versionNo },
        });
      }

      if (isAuto) {
        setAutoActionDataCache?.({
          cacheKey,
          data,
        });
      }
      if (triggerSnapshot === 1) {
        // eslint-disable-next-line no-await-in-loop
        await triggerSnapshotHook({
          taskDetail,
          dataForSubmit: data?.businessData,
        });
      }
    }
  }
  return { success: finalSuccessResult, variables, responseCollect, version };
};
