import lodash from 'lodash';
import CaseCategory from 'basic/enum/CaseCategory';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_: any, { select }: any) {
  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);
  const businessDataSustainabilityOptions = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.businessData?.sustainabilityOptions
  );

  if (
    ![CaseCategory.BP_NB_CTG001, CaseCategory.BP_NB_CTG005, CaseCategory.BP_AP_CTG02].includes(
      taskDetail.caseCategory
    )
  ) {
    return true;
  }
  if (lodash.isEmpty(businessDataSustainabilityOptions)) {
    return true;
  }

  const businessDataHaveApplied = lodash
    .chain(businessDataSustainabilityOptions)
    .some((item) => item?.applied === 'Y')
    .value();
  if (businessDataHaveApplied) {
    return true;
  }
  return false;
}
