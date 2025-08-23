import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import requestHandleType from 'bpm/enum/requestHandleType';
import PayType from 'process/NB/Enum/PayType';
import { NAMESPACE } from '../../activity.config';

export default function* (_, { select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  if (businessData?.taskId) {
    delete businessData.taskId;
  }
  if (businessData?.taskId) {
    delete businessData.activityKey;
  }

  const finalBusinessData = {
    businessData: formUtils.formatFlattenValue(formUtils.cleanValidateData(businessData)),
  };

  if (lodash.isEmpty(finalBusinessData)) {
    return requestHandleType.break;
  }
  if (lodash.get(finalBusinessData, 'businessData.policyList[0].manualExtendNtu') === 1) {
    lodash.set(finalBusinessData, 'businessData.policyList[0].manualExtendNtu', true);
  }
  if (
    lodash.toUpper(
      formUtils.queryValue(
        lodash.get(finalBusinessData, 'businessData.policyList[0].refundPayType')
      )
    ) !== PayType.BankTransfer
  ) {
    const bankInfoList = lodash.get(finalBusinessData, 'businessData.policyList[0].bankInfoList');
    const patchIndex = lodash.findIndex(bankInfoList, (item: any) => item.isPatch);

    if (patchIndex !== -1) {
      lodash.set(
        finalBusinessData,
        `businessData.policyList[0].bankInfoList[${patchIndex}].type`,
        null
      );
      lodash.set(
        finalBusinessData,
        `businessData.policyList[0].bankInfoList[${patchIndex}].selection`,
        null
      );
    }
  }

  return finalBusinessData;
}
