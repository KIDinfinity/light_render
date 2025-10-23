import lodash from 'lodash';
import { confirmRefund } from '@/services/owbNbProposalControllerService';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { NAMESPACE } from '../../activity.config';
import PremiumType from '../../Enum/premiumType';

export default function* (_, { call, put, select }: any) {
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );

  const { processInstanceId, taskId } = lodash.pick(taskDetail, [
    'caseNo',
    'inquiryBusinessNo',
    'businessNo',
    'taskStatus',
    'processInstanceId',
    'taskId',
  ]);

  const dataForSubmit = yield put.resolve({
    type: `getDataForSubmit`,
  });

  const response = yield confirmRefund(
    getSubmitData({
      taskDetail,
      dataForSubmit,
    })
  );

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const businessData = lodash.get(response.resultData, 'businessData', {});
    const premiumType = lodash.get(businessData, 'premiumType', '');

    if (premiumType !== PremiumType.PremiumRefund) {
      yield put({
        type: 'saveSnapshot',
        payload: {
          processInstanceId,
          taskId,
          postData: businessData,
        },
      });

      return taskId;
    } else {
      yield put({
        type: 'saveNeedConfirmBank',
        payload: {
          needConfirmBank: lodash.get(businessData, 'needConfirmBank', ''),
        },
      });
    }
  }
}
