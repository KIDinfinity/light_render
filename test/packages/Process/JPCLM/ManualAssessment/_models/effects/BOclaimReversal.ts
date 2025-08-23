import lodash from 'lodash';
import { reversal } from '@/services/claimJpLifejBoControllerService';
import { formUtils } from 'basic/components/Form';
import { notification } from 'antd';
import handleMessageModal from '@/utils/commonMessage';

export default function* BOclaimReversal(_: any, { call, select }: any) {
  // @ts-ignore
  const {
    treatmentPayableListMap,
    treatmentListMap,
    procedureListMap,
    procedurePayableListMap,
    opTreatmentPayableListMap,
  } = yield select(
    (state: any) => formUtils.cleanValidateData(state.JPCLMOfClaimAssessment.claimEntities) || {}
  );

  const reversalPayableList =
    lodash
      .chain([
        ...(lodash.values(treatmentPayableListMap) || []),
        ...(lodash.values(procedurePayableListMap) || []),
        ...(lodash.values(opTreatmentPayableListMap) || []),
      ])

      .filter((el: any) => el.reversalFlag === 'Y')
      .map((el: any) => ({
        ...el,
        originClaimNo:
          treatmentListMap?.[el.treatmentId]?.originClaimNo ||
          procedureListMap?.[el.procedureId]?.originClaimNo,
      }))
      .value() || [];

  if (reversalPayableList.length > 0) {
    // // @ts-ignore

    const response = yield call(reversal, [...reversalPayableList]);

    if (response?.success) {
      // TODO:把成功状态存储到sna里面

      notification.success({
        message: 'Claim Reversal successfully!',
      });
    } else {
      handleMessageModal(response?.promptMessages);
    }

    return response;
  }
}
