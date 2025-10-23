import lodash from 'lodash';
import { denormalizeClaimData } from 'opus/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import { getTouchResult } from '@/services/navigatorCaseTouchOperationControllerService';
import MessageModal from './MessageModal';
import { NAMESPACE } from '../../../activity.config';
import { formUtils } from 'basic/components/Form';
import { Action } from '@/components/AuditLog/Enum';
import wrapTouch from 'process/_modal/Assessment/functions/wrapTouch';

/**
 * 操作流程(TODO:后端应该给回mapping扁平化数据给我们)
 * 1.反扁平化处理
 * 2.FETOBE转化
 * 3.数据组装
 * 4.请求submit
 * 5.扁平化数据
 */

/**
 *
 * @param param0  - 原始数据
 * @param entities - 扁平化后的数据
 * @returns
 */

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

function* getConfirmData({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { type, businessData, option, isRetry } = payload;
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};
  const loadingStatus = yield select(({ login }: any) => login.loadingStatus) || false;
  // 3.数据组装
  const params = {
    businessData,
    ...lodash.pick(taskDetail, [
      // 'activityKey',
      'assignee',
      'businessNo',
      'caseCategory',
      'caseNo',
      'inquiryBusinessNo',
      // TODO：这个字段是否会有
      'companyCode',
      'taskId',
    ]),
    activityKey: taskDetail?.taskDefKey,
    operationType: type,
  };

  if(!isRetry) {
    const modalData = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
    ) || {};
  
    const processData = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
    ) || {};
    const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
    const denormalizedData = denormalizeClaimData(
      { ...processData, ...modalData.processData },
      { ...entities, ...modalData.entities }
    );
    yield put({
      type: 'auditLogController/logButton',
      payload: {
        action: Action.Confirm,
        activityKey: taskDetail?.taskDefKey,
        newProcessData: formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData)),
        isTitleSection: true,
      },
    });
  }

  // 4.请求数据
  const touchId: any = yield put.resolve({
    type: 'getTouchId',
    payload: {
      params,
      option,
    },
  });

  if (!!touchId) {
    while (true) {
      const response = yield getTouchResult({ touchId }, option);
      const responseBusinessData = response?.resultData?.businessData || {};

      if (!response?.success && !!loadingStatus) {
        yield put({
          type: 'login/saveLoadingStatus',
          payload: {
            loadingStatus: false,
          },
        });
      }

      const warnYes = yield MessageModal(response);

      // 二次确认
      if (!!warnYes || response?.warnData?.['x-warn-prompt']) {
        const headers = { ...response?.warnData };

        yield put({
          type: 'login/saveLoadingStatus',
          payload: {
            loadingStatus: true,
          },
        });
        yield put({
          type: 'saveProgressData',
          payload: {
            progressData: [],
          },
        });
        yield put({
          type: 'getConfirmData',
          payload: {
            businessData: response?.warnData?.['x-warn-prompt']
              ? { ...params?.businessData, promptSelected: warnYes ? 'Y' : 'N' }
              : params.businessData,
            ...payload,
            option: { headers },
            isRetry: true,
          },
        });
        break;
      }

      const progressData = yield put.resolve({
        type: 'getProgressData',
        payload: {
          touchId,
          params,
          option,
          warnData: response?.warnData,
          hasBusinessData: !lodash.isEmpty(responseBusinessData) && !!responseBusinessData,
        },
      });
      if (!lodash.isEmpty(responseBusinessData)) {
        yield put({
          type: 'getTouchResultAfter',
          payload: {
            response,
            progressData,
            submitBusinessData: businessData,
            type,
          },
        });
      }

      if (!lodash.isEmpty(responseBusinessData) || !response?.success) {
        yield put({
          type: 'getProgressStatus',
          payload: {
            response,
            progressData,
          },
        });
        yield put({
          type: `${NAMESPACE}/saveIsSaveDataComplete`,
          payload: {
            isSaveDataComplete: true,
          },
        });

        break;
      }

      yield call(delay, 2000);
    }
  }
  return false;
}

export default wrapTouch(getConfirmData, { showLoading: false, onCancel: function*(action, effects) {
  yield effects.put({
    type: 'clearProgressData',
  });
} });