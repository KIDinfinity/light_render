import lodash from 'lodash';
import { transfer, cancel, save } from '@/services/owbNbPremiumEnquiryControllerService';

import { notification } from 'antd';
import { NAMESPACE } from '../../../activity.config';

export default function* ({ payload }: any, { put, select }: any): Generator<any, any, any> {
  const { type } = payload;
  // 2.FETOBE转化
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  const BEDatas: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData: { ...processData, ...modalData.processData },
      entities: { ...entities, ...modalData.entities },
    },
  });
  const taskDetail = yield select(({ processTask }) => processTask.getTask);
  // TODO:这里为什么要提交整份数据

  const configs = {
    transfer: {
      url: transfer,
      message: 'Transfer',
    },
    cancel: {
      url: cancel,
      message: 'Cancel',
    },
    save: {
      url: save,
      message: 'Save',
    },
  };

  const data = configs[type];

  const response = yield data.url({
    businessData: {
      ...BEDatas,
    },
  });
  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isPlainObject(response.resultData) &&
    !lodash.isEmpty(response.resultData?.businessData)
  ) {
    const businessData = response.resultData?.businessData || {};
    yield put({
      type: 'getBEToFE',
      payload: {
        businessData,
      },
    });
    yield put({
      type: 'claimCaseController/saveSnapshot',
      payload: {
        postData: businessData,
      },
    });
    if (type === 'transfer') {
      yield put({
        type: 'savePremiumTransferList',
        payload: {
          premiumTransferList: businessData?.policyList?.[0]?.premiumTransferList,
        },
      });
    }
    //refreshintegrationChecklist
    if (taskDetail) {
      const { businessNo, caseNo, caseCategory, taskDefKey } = taskDetail;
      if (businessNo && caseNo && caseCategory) {
        yield put({
          type: 'integration/getIntegrationChecklist',
          payload: {
            businessNo,
            caseNo,
            caseCategory,
            taskDefKey,
          },
        });
      }
    }
    // TODO:这里需要国际化
    notification.success({
      message: `${data.message} successfully!`,
    });

    return true;
  } else {
    // TODO:这里需要国际化
    // notification.error({
    //   message: `${data.message} fail!`,
    // });
    return false;
  }
}
