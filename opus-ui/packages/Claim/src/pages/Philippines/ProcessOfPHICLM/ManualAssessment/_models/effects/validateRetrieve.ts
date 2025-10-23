import { formUtils } from 'basic/components/Form';
import { notification } from 'antd';
import { denormalizeClaimData } from '@/utils/claimUtils';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import {
  retrieveFundValues,
  fundValueValidation,
} from '@/services/claimPhMajorClaimControllerService';
export default function* validateRetrieve(_: any, { select, call, put }: any) {
  const { claimPayableListMap, claimProcessData, claimEntities } = yield select((state: any) => ({
    claimPayableListMap:
      state?.PHCLMOfClaimAssessmentController?.claimEntities?.claimPayableListMap,
    claimProcessData: state?.PHCLMOfClaimAssessmentController?.claimProcessData,
    claimEntities: state?.PHCLMOfClaimAssessmentController?.claimEntities,
  }));

  // const validators = lodash.compact([
  //   VLD_000366(claimPayableListMap),
  //   VLD_000369(claimPayableListMap)
  // ]);
  // if (lodash.size(validators) > 0) {
  //     handleMessageModal(validators);
  //     return false;
  // }
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const params = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const response1 = yield call(retrieveFundValues, params);
  if (response1?.success) {
    yield put({ type: 'saveClaimProcessData', payload: response1?.resultData });
  }
  const response = yield call(fundValueValidation, params);
  if (response?.success) {
    notification.success({
      message: formatMessageApi({
        Label_COM_Message: 'MSG_000385',
      }),
    });
  }
}
