import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* getListPerConfinementLimit(_: any, { select, put }: any) {
  const simpleDiseaseFlag = yield select(
    ({ daOfClaimAssessmentController }: any) =>
      daOfClaimAssessmentController.claimProcessData?.simpleDiseaseFlag
  ) || false;
  const fwaRuleFlag = yield select(
    ({ daOfClaimAssessmentController }: any) =>
      daOfClaimAssessmentController.claimProcessData?.fwaRuleFlag
  ) || 0;
  const listPolicy = yield select(
    ({ daOfClaimAssessmentController }: any) => daOfClaimAssessmentController.listPolicy
  ) || [];
  const benefitItemPayableListMap = yield select(
    ({ daOfClaimAssessmentController }: any) =>
      daOfClaimAssessmentController?.claimEntities.benefitItemPayableListMap
  ) || [];

  const list = formUtils.cleanValidateData(lodash.values(benefitItemPayableListMap));
  const showSavingAmount = simpleDiseaseFlag || fwaRuleFlag === 1;
  const benefitItemNameList = lodash
    .chain(list)
    .filter(({ payableDays, calculationDays }: any) => !!calculationDays)
    .value();

  const isChange = benefitItemNameList.some(
    ({ payableDays, calculationDays }) => calculationDays !== payableDays
  );
  let resultBenefitItemNameList = [];
  if (isChange) {
    resultBenefitItemNameList = lodash
      .chain(benefitItemNameList)
      .uniqBy('payableDays')
      .map(
        ({ benefitItemCode }: any) =>
          lodash.chain(listPolicy).find({ benefitItemCode }).get('benefitItemName').value() || ''
      )
      .value();
  }

  const errors =
    showSavingAmount &&
    resultBenefitItemNameList.length > 0 &&
    lodash.uniq(resultBenefitItemNameList).length > 1
      ? resultBenefitItemNameList
      : [];

  yield put({
    type: 'updateSimpleDiseasePayableDaysError',
    payload: { errors },
  });
  return errors;
}
