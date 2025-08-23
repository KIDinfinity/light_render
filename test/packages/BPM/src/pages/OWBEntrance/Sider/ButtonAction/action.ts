import lodash from 'lodash';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { safeParseUtil } from '@/utils/utils';
import delay from '@/utils/delay';
import getVeriables from './loopService/getVeriables';
import lifeCycle from './lifeCycle';
import loopService from './loopService/loopService';
import checkInfomation from '../Beyond/checkInfomation';

import after from './after';
import anyway from './anyway';
import notice from './notice';

const VALIDATE_SERVICECONFIG_INDEX = 1;

const loading = {};
let delayTime = 0;

export default async ({
  taskId,
  taskDetail,
  claimStates,
  buttonConfig,
  dispatch,
  contextDispatch,
  isShowNotice = true,
  isAuto = false,
  blockIndex = 0,
  autoActionDataCache,
  setAutoActionDataCache,
  commonActionLife,
  extraParams = {},
}: any) => {
  if (Date.now() - delayTime < 400) {
    return;
  }
  delayTime = Date.now();

  if (loading[buttonConfig.buttonCode]) {
    return;
  }
  loading[buttonConfig.buttonCode] = true;

  if (!(buttonConfig.buttonCode === 'save' && isAuto)) {
    dispatch({
      type: 'processTask/save',
      payload: { stopAutoSave: true },
    });
  }

  contextDispatch({
    type: 'setButtonStatus',
    payload: {
      buttonCode: buttonConfig.buttonCode,
      status: 'loading',
    },
  });
  await delay(20);

  if (lodash.isFunction(commonActionLife?.before)) {
    await commonActionLife.before({ dispatch, buttonCode: buttonConfig.buttonCode });
  }

  const serviceList = lodash.get(buttonConfig, 'activityButtonServiceList', []);

  // validate and errors
  const errors = await (async () => {
    // validate
    const validateErrors = await lifeCycle({
      action: buttonConfig.validate,
      dispatch,
      taskDetail,
      claimStates,
      allveriables: lodash.map(serviceList, (item) => getVeriables(item?.buttonParams)),
      method: lodash.get(
        safeParseUtil(serviceList[VALIDATE_SERVICECONFIG_INDEX]?.buttonParams),
        'method'
      ),
    });
    return validateErrors;
  })();

  // break的handle方式
  if (errors === requestHandleType.break) {
    contextDispatch({
      type: 'setButtonStatus',
      payload: {
        buttonCode: buttonConfig.buttonCode,
        status: 'default',
      },
    });
    loading[buttonConfig.buttonCode] = false;
    return;
  }
  // stop
  if (lodash.isArray(errors) && errors.length) {
    contextDispatch({
      type: 'setButtonStatusAndErrorCount',
      payload: {
        buttonCode: buttonConfig.buttonCode,
        status: 'error',
        errors,
      },
    });
    loading[buttonConfig.buttonCode] = false;
    return false;
  }

  // if (
  //   lodash.has(buttonConfig, 'preSubmitValidationUrl') &&
  //   !lodash.isEmpty(buttonConfig.preSubmitValidationUrl)
  // ) {
  //   const preSubmitValidateSuccess = await preSubmitValidation({
  //     buttonConfig,
  //     taskDetail,
  //   });
  //   if (!preSubmitValidateSuccess) {
  //     contextDispatch({
  //       type: 'setButtonStatus',
  //       payload: {
  //         buttonCode: buttonConfig.buttonCode,
  //         status: 'default',
  //       },
  //     });
  //     loading[buttonConfig.buttonCode] = false;
  //     return false;
  //   }
  // }

  // checkInformation
  if (buttonConfig.checkInformationApiUrl) {
    const checkInformationSuccess = await checkInfomation({
      buttonConfig,
      dispatch,
      taskDetail,
    });

    if (!checkInformationSuccess) {
      contextDispatch({
        type: 'setButtonStatus',
        payload: {
          buttonCode: buttonConfig.buttonCode,
          status: 'default',
        },
      });
      loading[buttonConfig.buttonCode] = false;
      return false;
    }
  }

  // loopService
  let success = false;
  const actionResult = await loopService({
    taskId,
    taskDetail,
    claimStates,
    buttonConfig,
    dispatch,
    blockIndex,
    autoActionDataCache,
    setAutoActionDataCache,
    isAuto,
    extraParams,
  });
  success = actionResult?.success;
  if (!success && actionResult?.pageGone) {
    return null;
  }

  // client after cofig
  if (success) {
    if (
      lodash.isFunction(commonActionLife?.after) &&
      !lodash.isEmpty(actionResult?.responseCollect)
    ) {
      await commonActionLife.after({
        buttonConfig,
        dispatch,
        isAuto,
        taskDetail,
        versionNo: actionResult?.version?.versionNo,
        buttonCode: buttonConfig.buttonCode,
        isSuccess: actionResult?.success,
        responseCollect: actionResult?.responseCollect,
      });
    }

    await after({
      responseCollect: actionResult.responseCollect,
      after: buttonConfig.after,
      buttonConfig,
      dispatch,
      contextDispatch,
      isAuto,
      taskDetail,
    });

    // action success
    if (isShowNotice && buttonConfig.buttonName && !actionResult.variables?.isReject) {
      notice({
        buttonCode: buttonConfig.buttonCode,
        message: buttonConfig.message,
      });
    }

    // service after config
    if (buttonConfig.afterHook) {
      setTimeout(async () => {
        await after({
          after: {
            type: buttonConfig.afterHook,
          },
          buttonConfig,
          dispatch,
          contextDispatch,
          isAuto,
        });
      }, 1000);
    }
  }

  anyway({
    anyway: buttonConfig.anyway,
    dispatch,
    isAuto,
    buttonCode: buttonConfig.buttonCode,
    isSuccess: actionResult?.success,
    responseCollect: actionResult?.responseCollect,
    taskDetail,
  });

  if (lodash.isFunction(commonActionLife?.anyway)) {
    commonActionLife.anyway({
      buttonConfig,
      dispatch,
      isSuccess: actionResult?.success,
      responseCollect: actionResult?.responseCollect,
      isAuto,
    });
  }

  contextDispatch({
    type: 'clearButtonLoadingStatus',
    payload: {
      buttonCode: buttonConfig.buttonCode,
    },
  });
  loading[buttonConfig.buttonCode] = false;

  if (!(buttonConfig.buttonCode === 'save' && isAuto)) {
    dispatch({
      type: 'processTask/save',
      payload: { stopAutoSave: false },
    });
  }
  return null;
};
