import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { CategoryLower, DocumentCategory, ePaymentMethod, mapingValue } from '../Enum';

const DefaultDiagnosis = {
  admission: () => [{ id: uuidv4() }],
  procedure: () => [{ id: uuidv4() }],
  procedure_mastect: () => [{ id: uuidv4() }],
  procedure_breastRecon: () => [{ id: uuidv4() }],
  procedure_ovariect: () => [{ id: uuidv4() }],
  hysterectomyHistory: () => [{ id: uuidv4() }],
  otherExam_MN: () => [{ id: uuidv4() }],
  regularTreatment_MN: () => [{ id: uuidv4() }],
  otherExam_IN: () => [{ id: uuidv4() }],
  regularTreatment_IN: () => [{ id: uuidv4() }],
  antiCancerMedsHistory: () => [{ id: uuidv4() }],
  hormoneTreatmentHistory: () => [{ id: uuidv4() }],
  painkillerHistory: () => [{ id: uuidv4() }],
  palliativeCare: () => [{ id: uuidv4() }],
};

const isNotEmpty = (target: any) => target !== null && target !== '' && target !== undefined;

const DefaultMap = {
  [CategoryLower.DiagnosisReport]: DefaultDiagnosis,
  [CategoryLower.HospitalizationReport]: {
    admission: () => [{ id: uuidv4() }],
  },
  [CategoryLower.DeathReport]: {
    procedures: () => [{ id: uuidv4() }],
    admission: () => [{ id: uuidv4() }],
  },
  [CategoryLower.OtherDiagnosisReport]: DefaultDiagnosis,
  [CategoryLower.TreatmentReport]: {
    treatmentHistory: () => [{ id: uuidv4() }],
  },
};

const RequestMap = {
  [CategoryLower.RequestForm]: {
    financialInstitution: (item: any) =>
      item.paymentMethod === ePaymentMethod.bank || isNotEmpty(item.accountNo)
        ? mapingValue.y
        : null,
    postalBank: (item: any) =>
      item.paymentMethod === ePaymentMethod.post || isNotEmpty(item.depositBookNo)
        ? mapingValue.y
        : null,
    premiumTransferAccount: (item: any) =>
      item.paymentMethod === ePaymentMethod.premium ? mapingValue.y : null,
  },
};

export default (item: any) => {
  const currentCategory = lodash.toLower(DocumentCategory[item.documentTypeCode]);
  const defaultMap = DefaultMap[currentCategory] || {};
  const requestMap = RequestMap[currentCategory] || {};
  lodash.forIn(defaultMap, (value, key) => {
    if (lodash.isEmpty(lodash.get(item, key))) {
      lodash.set(item, key, value());
    }
  });
  lodash.forIn(requestMap, (value, key) => {
    lodash.set(item, key, value(item));
  });
  return item;
};
