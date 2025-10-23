import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* compareData({ payload }: any, { put, select }: any) {
  const { sectionName, changedFields, id } = lodash.pick(payload, [
    'sectionName',
    'changedFields',
    'id',
  ]);

  if (lodash.size(changedFields) > 1) return;

  const { sourceData, hasChangeSection } = yield select((state: any) => ({
    sourceData: state?.daOfClaimAssessmentController?.originClaimEntities,
    hasChangeSection: state?.daOfClaimAssessmentController?.claimProcessData?.hasChangeSection,
  }));

  const key = lodash.findKey(changedFields, (item) => item);
  const value = formUtils.queryValue(lodash.get(changedFields, `${key}`));
  const target = lodash.get(sourceData, `${sectionName}.${id}.${key}`);

  const changedFieldList = lodash.get(hasChangeSection, `${sectionName}.${id}.changedFieldList`, []);

  const params =
    value !== target
      ? lodash.chain(changedFieldList).concat([key]).uniq().compact().value()
      : lodash
          .chain(changedFieldList)
          .filter((item) => item !== key)
          .uniq()
          .compact()
          .value();

  const payloadValue = {
    id,
    sectionName,
    changedFieldList: params,
  }

  yield put({
    type: 'saveHasChangeSection',
    payload: {
      sectionName,
      key: id,
      value: payloadValue,
    },
  });
}
