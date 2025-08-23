import { notification } from 'antd';

import lodash from 'lodash';
import { EOptionType } from 'basic/enum/EOptionType';
import addUpdateDate from '@/utils/addUpdateDate';
import wrapTouch from 'process/_modal/Assessment/functions/wrapTouch';
import { HANDLE_TYPE } from '../../../_enum';
import { NAMESPACE } from '../../../activity.config';

function* getCalculate({ payload }: any, { select, put }: any): Generator<any, any, any> {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};

  const { businessNo: applicationNo, caseNo } = taskDetail;

  yield put({
    type: 'auditLogController/logTask',
    payload: {
      action: payload.action,
    },
  });

  const BEDatas = yield put.resolve({
    type: 'getDataForSubmit',
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

      const possibleSusOptNames = lodash.get(businessData, 'possibleSusOptNames');
      if (lodash.isArray(possibleSusOptNames)) {
        yield put({
          type: `${NAMESPACE}/savePossibleSusOptNames`,
          possibleSusOptNames,
        });
      }

      yield addUpdateDate({ caseNo });

      yield put({
        type: 'loadProposalFlags',
        payload: {
          applicationNo,
        },
      });

      // TODO:这里需要国际化
      notification.success({
        message: 'recalculate success',
      });

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
    }

    return true;
  }
}

export default wrapTouch(getCalculate, { showLoading: true });
