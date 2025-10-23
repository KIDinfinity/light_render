import { isEmpty } from 'lodash';
import { getDenormalizeClaimData } from '../../Utils/normalize';
import { formatFormData } from '../../Utils/documentUtils';

export default function* ({ format = false }, { select }: any) {
  const { claimProcessData, doneBusinessCheck } = yield select((state: any) => ({
    claimProcessData: state.JPCLMOfQualityController.claimProcessData,
    doneBusinessCheck: state.JPCLMOfQualityController.doneBusinessCheck,
  }));
  const { claimEntities } = claimProcessData;
  const claimResultData = getDenormalizeClaimData({
    ...claimProcessData,
    claimEntities: {
      ...claimEntities,
      bpoFormDataList: formatFormData({
        formDataList: claimEntities.bpoFormDataList,
        clearEmptyArray: !!format,
      }),
    },
  });
  const extraData = !isEmpty(claimResultData) ? { doneBusinessCheck } : {};
  return {
    ...claimResultData,
    ...extraData,
  };
}
