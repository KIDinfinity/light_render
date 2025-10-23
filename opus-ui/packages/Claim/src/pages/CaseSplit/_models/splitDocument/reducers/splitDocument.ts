import { produce } from 'immer';
import lodash from 'lodash';
import { eCategory } from '../dto';

const updatePolicy = (oPolicy: any, tPolicy: any) => {
  const oPolicySize = lodash.size(oPolicy);
  const tPolicySize = lodash.size(tPolicy);
  if (oPolicySize !== tPolicySize) {
    return lodash.filter(oPolicy, (item) => !item.isSelected);
  }
  return oPolicy;
};

const updateDocumentData = (oDocumentData: any, tDocumentData: any) => {
  const oDocumentDataSize = lodash.size(oDocumentData);
  const tDocumentDataSize = lodash.size(tDocumentData);
  if (oDocumentDataSize !== tDocumentDataSize) {
    const diagnosisCategory = [
      eCategory.DiagnosisReport,
      eCategory.DeathReport,
      eCategory.HospitalizationReport,
      eCategory.TreatmentReport,
    ];
    const size = lodash
      .chain(oDocumentData)
      .groupBy('formCategory')
      .pick(diagnosisCategory)
      .values()
      .flattenDeep()
      .size()
      .value();
    return lodash.reduce(
      oDocumentData,
      (result, value, key) => {
        if (!value.isSelected) {
          result[key] = value;
        }
        if (value.formCategory === lodash.camelCase(eCategory.RequestForm)) {
          result[key] = value;
        }
        if (value.formCategory === lodash.camelCase(eCategory.DiagnosisReport) && size === 1) {
          result[key] = value;
        }
        return result;
      },
      {}
    );
  }
  return oDocumentData;
};

export default (state: any, { payload: { applicationNo } }: any) => {
  return produce(state, (draft: any) => {
    const applicationSize = lodash.size(draft.originalData);
    const target = lodash.cloneDeep(draft.originalData[applicationNo]);
    target.claimData.policy = lodash.filter(target.claimData.policy, (item) => item.isSelected);
    target.documentData = lodash.reduce(
      target.documentData,
      (result, value, key): any => {
        if (value.isSelected) {
          result[key] = value;
        }
        return result;
      },
      {}
    );
    draft.newData[applicationNo] = target;
    if (applicationSize > 1 && lodash.isEqual(target, draft.originalData[applicationNo])) {
      delete draft.originalData[applicationNo];
      return;
    }
    draft.originalData[applicationNo].claimData.policy = updatePolicy(
      draft.originalData[applicationNo].claimData.policy,
      target.claimData.policy
    );
    draft.originalData[applicationNo].documentData = updateDocumentData(
      draft.originalData[applicationNo].documentData,
      target.documentData
    );
  });
};
