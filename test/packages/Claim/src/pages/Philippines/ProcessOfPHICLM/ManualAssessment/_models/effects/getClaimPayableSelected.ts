/* eslint-disable import/no-unresolved */
import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { notification } from 'antd';
import { formUtils } from 'basic/components/Form';
import { register } from '@/services/claimPhLaMajorClaimRegisterControllerService';
import { handleMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* getClaimPayableSelected({ payload }: any, { call, select, put }: any) {
  const { claimProcessData, claimEntities } = yield select((state: any) => ({
    claimProcessData: state?.PHCLMOfClaimAssessmentController?.claimProcessData,
    claimEntities: state?.PHCLMOfClaimAssessmentController?.claimEntities,
  }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const params = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const response = yield call(register, params);
  if (response?.success && response?.resultData) {
    if (lodash.isEmpty(response?.promptMessages)) {
      notification.success({
        message: formatMessageApi({
          Label_BIZ_Claim: 'RegsiterSuccess',
        }),
      });
    } else {
      handleMessageModal(response?.promptMessages);
    }
    yield put({
      type: 'saveClaimProcessData',
      payload: response.resultData,
    });
  }
}
