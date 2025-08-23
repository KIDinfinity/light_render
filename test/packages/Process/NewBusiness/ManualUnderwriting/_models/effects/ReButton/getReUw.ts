import lodash from 'lodash';
import { notification } from 'antd';

import { updateOperationDate } from '@/services/bpmBusinessProcessControllerV2Service';

import { NAMESPACE } from '../../../activity.config';
import { HANDLE_TYPE } from '../../../_enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import wrapTouch from 'process/_modal/Assessment/functions/wrapTouch';

import { EOptionType } from 'basic/enum/EOptionType';

/**
 * 流程(TODO:一些专门的proposal逻辑展示去掉)
 */

/**
 * 参数说明
 * @param action - >操作的类型
 * @param param1
 */
function* getReUw({ payload }: any, { call, select, put }: any): Generator<any, any, any> {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};

  const { businessNo: applicationNo } = taskDetail;

  yield put({
    type: 'auditLogController/logTask',
    payload: {
      action: payload.action,
    },
  });

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  const BEDatas: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData,
      entities,
    },
  });

  if (!lodash.isEmpty(BEDatas)) {
    const businessData: any = yield put.resolve({
      type: 'getBusinessData',
      payload: {
        businessData: BEDatas,
        ...payload,
      },
    });

    if (!!businessData && !lodash.isEmpty(businessData)) {
      yield put({
        type: 'getBEToFE',
        payload: {
          businessData,
          handleType: HANDLE_TYPE.initSustainability,
        },
      });

      yield put({
        type: 'claimCaseController/saveSnapshot',
        payload: {
          postData: businessData,
          optionType: EOptionType.Save,
        },
      });

      if (businessData?.policyList?.[0].syncSuccessfully) {
        yield call(updateOperationDate, {
          processInstanceId: businessData?.caseNo,
        });

        notification.success({
          message: formatMessageApi({
            Label_COM_WarningMessage: 'venus_bpm.message.retry.success',
          }),
        });
      }

      yield put({
        type: 'insured360/getCustomerTypeConfig',
      });

      yield put({
        type: 'getRiskIndicator',
        payload: {
          applicationNo,
        },
      });
      yield put({
        type: 'loadProposalFlags',
        payload: {
          applicationNo,
        },
      });

      yield put({
        type: 'envoyController/initEnvoyData',
      });

      if (applicationNo && businessData?.caseNo && businessData?.caseCategory) {
        yield put({
          type: 'integration/getIntegrationChecklist',
          payload: {
            businessNo: applicationNo,
            caseNo: businessData?.caseNo,
            caseCategory: businessData?.caseCategory,
            taskDefKey: businessData?.activityKey,
          },
        });
      }

      return true;
    } else {
      // TODO:这里应该后端去加弹窗,不应该前端写
    }
  }
  return true;
}

export default wrapTouch(getReUw, { showLoading: true })