import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eClaimDecision } from 'claim/enum/claimDecision';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { Booster } from 'claim/enum/Booster';
import { add } from '@/utils/precisionUtils';
import getPolicyYearValue from 'process/PHCLM/ManualAssessment/_models/functions/getPolicyYearValue';

export const sumDecision = (list: any) => {
  const rule = [
    eClaimDecision.pending,
    eClaimDecision.exgratia,
    eClaimDecision.approve,
    eClaimDecision.deny,
    eClaimDecision.na,
  ];
  let result = null;
  lodash.forEach(rule, (item) => {
    if (lodash.some(list, (self) => formUtils.queryValue(self.claimDecision) === item)) {
      result = item;
      return false;
    }
  });
  return result;
};

export const payableDays = (prex: any, next: any) => {
  const tempPayableDays =
    (formUtils.queryValue(prex) ?? '') >= (formUtils.queryValue(next) ?? '')
      ? formUtils.queryValue(prex)
      : formUtils.queryValue(next);
  return tempPayableDays ?? '';
};

export const findBoosterForPayable = (target: any, servicePayableMap: any) => {
  const rule = lodash.pick(target, [
    'policyNo',
    'benefitItemCode',
    'productCode',
    'productPlan',
    'policyCurrency',
    'serviceItemId',
  ]);
  return (
    lodash.find(servicePayableMap, {
      ...rule,
      booster: Booster.Yes,
    }) || {}
  );
};

export const mapToBenefitType = (
  target: any,
  source: any,
  benefitCategory: string,
  handleExtra?: Function
) => {
  return lodash.reduce(
    source,
    (result, item: any) => {
      const temp: any = result;
      temp.claimDecision = target?.claimDecision;
      temp.benefitTypeCode = target?.benefitTypeCode;
      temp.policyNo = target?.policyNo;
      temp.productCode = target?.productCode;

      temp.remark = item?.remark;
      temp.exGratiaCode = item?.exGratiaCode;
      temp.exGratiaReason = item?.exGratiaReason;
      temp.denyCode = item?.denyCode;
      temp.denyReason = item?.denyReason;
      temp.payableAmount = add(result.payableAmount, formUtils.queryValue(item?.payableAmount));
      temp.payableDays = payableDays(result.payableDays, item?.payableDays);
      temp.groupBy = lodash.concat(temp.groupBy, [item]);
      const extra = lodash.isFunction(handleExtra) && handleExtra(temp);
      return lodash.isObject(extra) ? { ...temp, ...extra } : temp;
    },
    {
      claimDecision: '',
      benefitTypeCode: null,
      payableAmount: 0,
      payableDays: '',
      groupBy: [],
      benefitCategory,
    }
  );
};

export const mapToBenefitItem = (data: any, benefitCategory: string, booster: any) =>
  lodash
    .chain(data)
    .groupBy((item) => formUtils.queryValue(item?.benefitItemCode))
    .map((self, selfKey) => ({
      claimDecision: sumDecision(self),
      benefitItemCode: selfKey,
      ...lodash.reduce(
        self,
        (result: any, reduceItem: any) => ({
          systemCalculationAmount: add(
            result?.systemCalculationAmount || 0,
            formUtils.queryValue(reduceItem?.systemCalculationAmount)
          ),
          systemPayableDays: add(
            result?.systemPayableDays || 0,
            formUtils.queryValue(reduceItem?.systemPayableDays)
          ),
          payableAmount: add(
            result?.payableAmount || 0,
            formUtils.queryValue(reduceItem?.payableAmount)
          ),
          payableDays: payableDays(result?.payableDays || '', reduceItem?.payableDays),
        }),
        {}
      ),
      ...lodash.pick(lodash.first(self), [
        'policyNo',
        'productCode',
        'benefitTypeCode',
        'isAdjustment',
      ]),
      ...lodash.reduce(
        lodash.filter(booster, (el) => formUtils.queryValue(el?.benefitItemCode) === selfKey),
        (dataMap: any, itemTemp: any) => ({
          boosterAmount: add(
            dataMap?.boosterAmount || 0,
            formUtils.queryValue(itemTemp?.payableAmount)
          ),
          boosterDays: payableDays(
            dataMap?.boosterDays || '',
            formUtils.queryValue(itemTemp?.payableDays)
          ),
          boosterCalculationAmount: add(
            dataMap?.boosterCalculationAmount || 0,
            formUtils.queryValue(itemTemp?.systemCalculationAmount)
          ),
          boosterSystemPayableDays: add(
            dataMap?.boosterCalculationAmount || 0,
            formUtils.queryValue(itemTemp?.systemPayableDays)
          ),
          boosterDate: [...(dataMap?.boosterDate || []), itemTemp],
        }),
        {}
      ),
      groupBy: self,
      benefitCategory,
    }))
    .value();

export const mapToBenefitItemV2 = (data: any) =>
  lodash
    .chain(data)
    .groupBy((item) => formUtils.queryValue(item?.benefitItemCode))
    .map((self, selfKey) => ({
      claimDecision: sumDecision(self),
      benefitItemCode: selfKey,
      ...lodash.reduce(
        self,
        (result: any, reduceItem: any) => ({
          systemCalculationAmount: add(
            result?.systemCalculationAmount || 0,
            formUtils.queryValue(reduceItem?.systemCalculationAmount)
          ),
          systemPayableDays: add(
            result?.systemPayableDays || 0,
            formUtils.queryValue(reduceItem?.systemPayableDays)
          ),
          payableAmount: add(
            result?.payableAmount || 0,
            formUtils.queryValue(reduceItem?.payableAmount)
          ),
          payableDays: payableDays(result?.payableDays || '', reduceItem?.payableDays),
        }),
        {}
      ),
      ...lodash.pick(lodash.first(self), [
        'policyNo',
        'productCode',
        'benefitTypeCode',
        'isAdjustment',
        'benefitCategory',
        'policyYear',
        'calculateByPolicyYear',
        'booster',
        'unitType',
        'payableId',
        'regularSeqNo',
      ]),
      sourceId: lodash.map(self, (sourceItem) => sourceItem.id),
    }))
    .value();

const relationshipForBenefitType = ({ target, mapKeys }: any) => {
  const extra = lodash.reduce(
    target,
    (result, self): any => {
      const { policyNo, id, benefitTypeCode, benefitCategory } = lodash.pick(
        formUtils.cleanValidateData(self),
        ['policyNo', 'id', 'benefitTypeCode', 'benefitCategory']
      );
      const children = lodash.filter(
        mapKeys?.[benefitCategory],
        (filterItem) =>
          filterItem?.payableId === id &&
          filterItem?.policyNo === policyNo &&
          formUtils.queryValue(filterItem?.benefitTypeCode) === benefitTypeCode &&
          filterItem?.booster !== Booster.Yes
      );
      const boosters =
        benefitCategory === eBenefitCategory.Reimbursement
          ? lodash
              .chain(children)
              .map((payableItem) => {
                const {
                  policyNo: pno,
                  benefitItemCode,
                  productCode,
                  productPlan,
                  policyCurrency,
                } = lodash.pick(formUtils.cleanValidateData(payableItem), [
                  'policyNo',
                  'benefitItemCode',
                  'productCode',
                  'productPlan',
                  'policyCurrency',
                ]);
                const booster =
                  lodash.find(mapKeys?.[benefitCategory], {
                    policyNo: pno,
                    benefitItemCode,
                    productCode,
                    productPlan,
                    booster: Booster.Yes,
                    policyCurrency,
                    serviceItemId: payableItem?.serviceItemId,
                  }) || {};

                return booster;
              })
              .filter((boosterItem: any) => !lodash.isEmpty(boosterItem))
              .value()
          : [];

      return {
        children: [...result?.children, ...children],
        boosters: [...result?.boosters, ...boosters],
      };
    },
    { children: [], boosters: [] }
  );
  return {
    ...extra,

    payableDays: lodash.reduce(
      extra?.children,
      (result, reduceItem: any) => payableDays(result, reduceItem?.payableDays),
      ''
    ),
    payableAmount: lodash.reduce(
      extra?.children,
      (result, reduceItem: any) => add(result, formUtils.queryValue(reduceItem?.payableAmount)),
      0
    ),
    systemCalculationAmount: lodash.reduce(
      extra?.children,
      (result, reduceItem: any) =>
        add(result, formUtils.queryValue(reduceItem?.systemCalculationAmount)),
      0
    ),
    systemPayableDays: lodash.reduce(
      extra?.children,
      (result, reduceItem: any) => payableDays(result, reduceItem?.systemPayableDays),
      ''
    ),
    boosterAmount:
      lodash.size(extra?.boosters) > 0 &&
      lodash.every(extra?.boosters, (item: any) =>
        lodash.isNumber(formUtils.queryValue(item?.payableAmount))
      )
        ? lodash.reduce(
            extra?.boosters,
            (result, reduceItem: any) =>
              add(result, formUtils.queryValue(reduceItem?.payableAmount)),
            0
          )
        : null,
    boosterDays: lodash.reduce(
      extra?.boosters,
      (result, reduceItem: any) => payableDays(result, reduceItem?.payableDays),
      ''
    ),
    boosterSystemAmount: lodash.reduce(
      extra?.boosters,
      (result, reduceItem: any) =>
        add(result, formUtils.queryValue(reduceItem?.systemCalculationAmount)),
      0
    ),
    boosterSystemDays: lodash.reduce(
      extra?.boosters,
      (result, reduceItem: any) => payableDays(result, reduceItem?.systemPayableDays),
      ''
    ),
  };
};

export const mapToBenefitTypeNew = ({ source, mapKeys }: any) =>
  lodash
    .chain(source)
    .groupBy(
      (item) =>
        `${formUtils.queryValue(item?.benefitTypeCode)}${formUtils.queryValue(
          item?.productCode
        )}${getPolicyYearValue(item)}`
    )
    .map((item) => ({
      ...lodash.pick(lodash.first(item), [
        'benefitTypeCode',
        'remark',
        'exGratiaCode',
        'exGratiaReason',
        'denyCode',
        'denyReason',
        'benefitCategory',
        'productCode',
        'policyNo',
        'claimDecision',
        'incidentId',
        'id',
        'hasCallExternalSystem',
        'policyYear',
        'calculateByPolicyYear',
      ]),
      groupBy: item,
      ...relationshipForBenefitType({ target: item, mapKeys }),
      viewOrder: lodash.minBy(item, 'viewOrder')?.viewOrder,
    }))
    .orderBy('viewOrder')
    .value();

export const BenefitKeysMap = {
  [eBenefitCategory.Reimbursement]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'invoicePayableList' },
    { mapKey: 'invoicePayableListMap', listKey: 'serviceItemPayableList' },
    { mapKey: 'serviceItemPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Cashless]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Aipa]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'accidentBenefitPayableList' },
    { mapKey: 'accidentBenefitPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.S]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'procedurePayableList' },
    { mapKey: 'procedurePayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Crisis]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'otherProcedurePayableList' },
    { mapKey: 'otherProcedurePayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Life]: [{ mapKey: 'claimPayableListMap.lifePayable', listKey: '' }],
  default: [
    {
      mapKey: 'claimPayableListMap',
      listKey: '',
    },
  ],
};

export const getBenefitKeys = (benefitCategory: eBenefitCategory, dex: number) => {
  const mapKey: string =
    BenefitKeysMap?.[benefitCategory]?.[dex]?.mapKey || BenefitKeysMap?.[dex]?.mapKey;
  const listKey: string = BenefitKeysMap?.[benefitCategory]?.[dex]?.listKey;
  return {
    mapKey,
    listKey,
  };
};

export const getBenefitLastKeyMapName = (benefitCategory: eBenefitCategory) => {
  const keys = BenefitKeysMap[benefitCategory];
  if (!keys || benefitCategory === 'L') {
    return BenefitKeysMap.default[0].mapKey as string;
  }
  const lastIndex = BenefitKeysMap[benefitCategory].length - 1;
  return BenefitKeysMap[benefitCategory][lastIndex].mapKey as string;
};

interface Payable {
  benefitCategory: eBenefitCategory;
  registered?: boolean;
  policyNo: string;
  lifePayable?: any;
}

export const getLeafPayable = (claimEntities) => (claimPayable) => {
  if (claimPayable.benefitCategory === eBenefitCategory.Life) {
    return [claimPayable.lifePayable];
  }

  const keysMap = BenefitKeysMap[claimPayable.benefitCategory];
  const getLeaf = (payable, dex = 0) => {
    const { listKey } = keysMap[dex];
    if (listKey && payable?.[listKey]?.length) {
      const { mapKey } = keysMap[dex + 1];
      return payable[listKey].flatMap((payableId) =>
        getLeaf(claimEntities[mapKey]?.[payableId], dex + 1)
      );
    }
    return [payable];
  };
  return getLeaf(claimPayable);
};

export function getAllLeafPayableList(claimEntities: any) {
  const claimPayableListMap: Record<string, Payable> = claimEntities.claimPayableListMap;
  const claimPayableList = Object.values(claimPayableListMap);
  return claimPayableList.flatMap(getLeafPayable(claimEntities));
}

// 内有循环赋值，避免在双重immer下调用
export function modifyAllLayerOfPayable(claimPayable, claimEntities, callback) {
  if (claimPayable.benefitCategory === eBenefitCategory.Life) {
    callback(claimPayable);
    callback(claimPayable.lifePayable);
    return;
  }

  const keysMap = BenefitKeysMap[claimPayable.benefitCategory];
  const layerHelper = (payable, dex = 0) => {
    const { listKey } = keysMap[dex];
    callback(payable);
    if (listKey && payable[listKey]?.length) {
      const { mapKey } = keysMap[dex + 1];
      for (const key of payable[listKey]) {
        layerHelper(claimEntities[mapKey][key], dex + 1);
      }
    }
  };
  layerHelper(claimPayable);
}

export function getNotRegisterPayablePolicyNo(claimEntities: any) {
  const payableList = getAllLeafPayableList(claimEntities);
  const NotRegisterPolicyNos = payableList.filter((p) => !p?.regularSeqNo).map((p) => p.policyNo);
  return Array.from(new Set(NotRegisterPolicyNos));
}
