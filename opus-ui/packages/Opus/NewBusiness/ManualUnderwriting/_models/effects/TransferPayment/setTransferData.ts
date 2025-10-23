import lodash from 'lodash';
import { transfer, cancel, save } from '@/services/owbNbPremiumEnquiryControllerService';

import { Modal } from 'antd';
import { NAMESPACE } from '../../../activity.config';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { TransferPaymentStatus } from 'opus/NewBusiness/ManualUnderwriting/_enum';

export default function* ({ payload }: any, { put, select }: any): Generator<any, any, any> {
  const { type, businessData } = payload;

  // 2.FETOBE转化
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  let cleanedData: any = {};
  if (businessData) {
    cleanedData = lodash.cloneDeep(businessData);

    cleanedData.policyList[0].premiumTransferList = modalData.processData.premiumTransferList.map(
      (listItem: any) => {
        const { id, policyId, targetPolicyId, amount, status, targetApplicationNo } = listItem;

        return {
          id,
          policyId: formUtils.queryValue(policyId),
          targetPolicyId: formUtils.queryValue(targetPolicyId),
          amount: formUtils.queryValue(amount),
          status: formUtils.queryValue(status),
          targetApplicationNo: formUtils.queryValue(targetApplicationNo),
        };
      }
    );
  }

  const BEDatas: any =
    !!cleanedData && !lodash.isEmpty(cleanedData)
      ? cleanedData
      : yield put.resolve({
          type: 'getFEToBE',
          payload: {
            processData: { ...processData, ...modalData.processData },
            entities: { ...entities, ...modalData.entities },
          },
        });

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
    const updatedList = businessData?.policyList?.[0]?.premiumTransferList || [];

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
          premiumTransferList: updatedList,
        },
      });
    }

    // 前端暂时手动判断是否有出错内容
    const hasError = updatedList.some((item) => item.status === TransferPaymentStatus.Failed);

    if (!hasError) {
      // TODO:这里需要国际化
      Modal.success({
        title: formatMessageApi({
          Label_COM_Opus: 'Success',
        }),
        centered: true,
        content: `You have successfully transfered the premium payment.`,
      });

      return true;
    }

    return false;
  } else {
    // TODO:这里需要国际化
    // notification.error({
    //   message: `${data.message} fail!`,
    // });
    return false;
  }
}
