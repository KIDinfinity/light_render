import lodash from 'lodash';
import dcProposalControllerService from '@/services/dcProposalControllerService';
import { businessDataBEToFE } from '@/services/gotConvertService';
import { produce } from 'immer';

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
      const transferData = {
        ...response,
        resultData: { ...response.resultData, businessData: covertResponse.responseData },
        originEWSData: lodash.get(response, 'resultData.businessData'),
      };

      const result = produce(transferData, (draftState: any) => {
        lodash.set(
          draftState,
          'resultData.businessData.policyList[0].voiceRecord',
          lodash.get(responseData, 'policyList[0].voiceRecord')
        );
      });

      return result;
    }
  }
  return response;
}
