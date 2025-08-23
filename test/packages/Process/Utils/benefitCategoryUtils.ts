import { BenefitCategoryEnum } from './Payable/Enum';
import lodash from 'lodash';

enum PayableListMapEnum {
  Claim = 'claimPayableListMap',
  Treatment = 'treatmentPayableListMap',
  Invoice = 'invoicePayableListMap',
  Service = 'serviceItemPayableListMap',
  Procedure = 'procedurePayableListMap',
  OtherProcedure = 'otherProcedurePayableListMap',
  Accident = 'accidentBenefitPayableListMap',
  BenefitItem = 'benefitItemPayableListMap',
}

enum PayableListEnum {
  Claim = 'claimPayableList',
  Treatment = 'treatmentPayableList',
  Invoice = 'invoicePayableList',
  Service = 'serviceItemPayableList',
  Procedure = 'procedurePayableList',
  OtherProcedure = 'otherProcedurePayableList',
  Accident = 'accidentBenefitPayableList',
  BenefitItem = 'benefitItemPayableList',
}

enum payableIdEnum {
  Claim = 'payableId',
  Treatment = 'treatmentPayableId',
  Invoice = 'invoicePayableId',
  Service = 'serviceItemPayableId',
  Procedure = 'procedurePayableId',
  OtherProcedure = 'otherProcedurePayableId',
  Accident = 'accidentBenefitPayableId',
}

const mapForCalculat = {
  mapKey: PayableListMapEnum.Claim,
  children: {
    [BenefitCategoryEnum.OldReimbursement]: {
      ...{ mapKey: PayableListMapEnum.Treatment, payableKey: PayableListEnum.Treatment },
      children: {
        ...{ mapKey: PayableListMapEnum.Invoice, payableKey: PayableListEnum.Invoice },
        children: {
          ...{ mapKey: PayableListMapEnum.BenefitItem, payableKey: PayableListEnum.BenefitItem },
        },
      },
    },
    [BenefitCategoryEnum.Reimbursement]: {
      ...{ mapKey: PayableListMapEnum.Treatment, payableKey: PayableListEnum.Treatment },
      children: {
        ...{ mapKey: PayableListMapEnum.Invoice, payableKey: PayableListEnum.Invoice },
        children: {
          ...{ mapKey: PayableListMapEnum.Service, payableKey: PayableListEnum.Service },
        },
      },
    },
    [BenefitCategoryEnum.Cashless]: {
      ...{ mapKey: PayableListMapEnum.Treatment, payableKey: PayableListEnum.Treatment },
    },
    [BenefitCategoryEnum.Aipa]: {
      ...{ mapKey: PayableListMapEnum.Treatment, payableKey: PayableListEnum.Treatment },
      children: {
        ...{ mapKey: PayableListMapEnum.Accident, payableKey: PayableListEnum.Accident },
      },
    },
    [BenefitCategoryEnum.S]: {
      ...{ mapKey: PayableListMapEnum.Treatment, payableKey: PayableListEnum.Treatment },
      children: {
        ...{ mapKey: PayableListMapEnum.Procedure, payableKey: PayableListEnum.Procedure },
      },
    },
    [BenefitCategoryEnum.T]: {
      ...{ mapKey: PayableListMapEnum.Treatment, payableKey: PayableListEnum.Treatment },
      children: {
        ...{
          mapKey: PayableListMapEnum.OtherProcedure,
          payableKey: PayableListEnum.OtherProcedure,
        },
      },
    },
    [BenefitCategoryEnum.Crisis]: {
      ...{ mapKey: PayableListMapEnum.Treatment, payableKey: PayableListEnum.Treatment },
      children: {
        ...{
          mapKey: PayableListMapEnum.OtherProcedure,
          payableKey: PayableListEnum.OtherProcedure,
        },
      },
    },
  },
};

const mapToPayableListMap = {
  [BenefitCategoryEnum.Cashless]: PayableListMapEnum.Treatment,
  [BenefitCategoryEnum.Aipa]: PayableListMapEnum.Accident,
  [BenefitCategoryEnum.Reimbursement]: PayableListMapEnum.Service,
  [BenefitCategoryEnum.S]: PayableListMapEnum.Procedure,
  [BenefitCategoryEnum.T]: PayableListMapEnum.OtherProcedure,
  [BenefitCategoryEnum.Crisis]: PayableListMapEnum.OtherProcedure,
};

const claimPayableLeverMap = {
  mapKey: PayableListMapEnum.Claim,
  listKey: '',
  parentKey: '',
  parentIdKey: '',
};

const treatmentPayableLeverMap = {
  mapKey: PayableListMapEnum.Treatment,
  listKey: PayableListEnum.Treatment,
  parentKey: PayableListMapEnum.Claim,
  parentIdKey: payableIdEnum.Claim,
};

const serviceItemPayableLeverMap = {
  mapKey: PayableListMapEnum.Service,
  listKey: PayableListEnum.Service,
  parentKey: PayableListMapEnum.Invoice,
  parentIdKey: payableIdEnum.Invoice,
};

const invoicePayableLeverMap = {
  mapKey: PayableListMapEnum.Invoice,
  listKey: PayableListEnum.Invoice,
  parentKey: PayableListMapEnum.Treatment,
  parentIdKey: payableIdEnum.Treatment,
};

const accidentPayableLeverMap = {
  mapKey: PayableListMapEnum.Accident,
  listKey: PayableListEnum.Accident,
  parentKey: PayableListMapEnum.Treatment,
  parentIdKey: payableIdEnum.Treatment,
};

const procedurePayableLeverMap = {
  mapKey: PayableListMapEnum.Procedure,
  listKey: PayableListEnum.Procedure,
  parentKey: PayableListMapEnum.Treatment,
  parentIdKey: payableIdEnum.Treatment,
};

const otherProcedurePayableLeverMap = {
  mapKey: PayableListMapEnum.OtherProcedure,
  listKey: PayableListEnum.OtherProcedure,
  parentKey: PayableListMapEnum.Treatment,
  parentIdKey: payableIdEnum.Treatment,
};

const mapForHandle = {
  default: [],
  [BenefitCategoryEnum.Cashless]: [treatmentPayableLeverMap, claimPayableLeverMap],
  [BenefitCategoryEnum.Aipa]: [
    accidentPayableLeverMap,
    treatmentPayableLeverMap,
    claimPayableLeverMap,
  ],
  [BenefitCategoryEnum.Reimbursement]: [
    serviceItemPayableLeverMap,
    invoicePayableLeverMap,
    treatmentPayableLeverMap,
    claimPayableLeverMap,
  ],
  [BenefitCategoryEnum.S]: [
    procedurePayableLeverMap,
    treatmentPayableLeverMap,
    claimPayableLeverMap,
  ],
  [BenefitCategoryEnum.Crisis]: [
    otherProcedurePayableLeverMap,
    treatmentPayableLeverMap,
    claimPayableLeverMap,
  ],
  [BenefitCategoryEnum.L]: [claimPayableLeverMap],
};

const benefitCategorySwitch = (config: any) => (benefitCategory: string) => {
  return lodash.isFunction(config?.[benefitCategory]) ? config?.[benefitCategory] : () => {};
};

export {
  mapToPayableListMap,
  mapForCalculat,
  mapForHandle,
  benefitCategorySwitch,
  BenefitCategoryEnum,
};
