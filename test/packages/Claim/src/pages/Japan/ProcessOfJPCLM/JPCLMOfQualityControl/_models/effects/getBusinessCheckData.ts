import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatFormData } from '../../Utils/documentUtils';

export default function* (_: any, { select }: any) {
  const { parentClaimNo, bpoFormDataList } = yield select((state: any) => ({
    bpoFormDataList: lodash.get(
      state,
      'JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList'
    ),
    parentClaimNo: state.processTask.getTask.inquiryClaimNo,
  }));
  const formDataList = formUtils.formatFlattenValue(formUtils.cleanValidateData(bpoFormDataList));
  return {
    parentClaimNo,
    formDataList: lodash.map(
      lodash.values(formatFormData({ formDataList, clearEmptyArray: true })),
      (el: any) => ({
        ...el.formData,
        formCategory: el.formCategory || el.formData?.formCategory,
      })
    ),
  };
}
