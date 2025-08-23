import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CaseCategory from 'basic/enum/CaseCategory';

export default function* (action: any, { select, put }: any) {
  const type = action?.payload?.type;
  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);
  const businessDataSustainabilityOptions = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.processData?.sustainabilityOptions
  );

  const sustainabilityModalSustainabilityOptions = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace?.sustainabilityModal?.sustainabilityOptions
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
  const sustainabilityModalHaveApplied = lodash
    .chain(sustainabilityModalSustainabilityOptions)
    .some((item) => item?.applied === 'Y')
    .value();

  if (businessDataHaveApplied && type === 'main') {
    return true;
  }

  if (sustainabilityModalHaveApplied && type === 'modal') {
    return true;
  }
  yield put({
    type: 'saveSustainabilityValidate',
    payload: {
      sustainabilityValidate: true,
    },
  });
  return false;
}
