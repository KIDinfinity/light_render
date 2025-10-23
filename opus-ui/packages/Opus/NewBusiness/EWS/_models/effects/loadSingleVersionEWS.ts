import lodash from 'lodash';
import dcProposalControllerService from '@/services/dcProposalControllerService';
import { businessDataBEToFE } from '@/services/gotConvertService';

export default function* ({ payload }: any, { call }: any) {
  const { applicationNo, id } = lodash.pick(payload, ['applicationNo', 'id']);
  const response = yield call(dcProposalControllerService.getEwsById, {
    applicationNo,
    id,
  });
  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    !lodash.isEmpty(response?.resultData?.businessData)
  ) {
    const responseData = response?.resultData?.businessData;
    const covertResponse = yield call(businessDataBEToFE, { requestData: { ...responseData } });
    if (
      lodash.isPlainObject(covertResponse) &&
      !!covertResponse?.success &&
      !lodash.isEmpty(covertResponse?.responseData)
    ) {
      return {
        ...response,
        resultData: { ...response.resultData, businessData: covertResponse.responseData },
      };
    }
  }
  return response;
}
