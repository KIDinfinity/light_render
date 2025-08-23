import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eClaimDecision } from 'claim/enum/claimDecision';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { Booster } from 'claim/enum/Booster';
import { add } from '@/utils/precisionUtils';
import getPolicyYearValue from 'process/HKCLM/ManualAssessment/_models/functions/getPolicyYearValue';

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

export const comparePayableDays = (prex: any, next: any) => {
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
      temp.payableDays = comparePayableDays(result.payableDays, item?.payableDays);
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

export const newPayableDays = (payableList: any, key?: string) => {
  const benefitCategory = payableList?.[0]?.benefitCategory;



  switch (benefitCategory) {
    case eBenefitCategory.Reimbursement:
      return lodash
        .chain(payableList)
        .groupBy((item) => formUtils.queryValue(item?.invoiceId))
        .reduce((result: any, list: any) => {
          const maxDay = lodash.reduce(
            list,
            (total: any, item: any) => {
              const payableDays = !!key ? item[key] : item.payableDays;

              return  comparePayableDays(total || '', payableDays);
            },

            ""
          );

          return !maxDay ? result : Number(result) + Number(maxDay);
        }, "")
        .value();

    default:
      const values = lodash
      .chain(payableList)
      .map((item: any) => {
        return formUtils.queryValue(lodash.get(item, key || 'payableDays'));
      })
      .filter((item: any) => {
        return !lodash.isNil(item) && item !== ''
      })
      .value();
      return values?.length ? lodash.max(values) : ''
  }
};

export const mapToBenefitItem = (data: any, benefitCategory: string, booster: any) =>
  lodash
    .chain(data)
    .groupBy((item) => formUtils.queryValue(item?.benefitItemCode))
    .map((self, selfKey) => ({
      claimDecision: sumDecision(self),
      benefitItemCode: selfKey,
      payableDays: newPayableDays(self),
      boosterDays: newPayableDays(booster),
      boosterSystemPayableDays: newPayableDays(booster, 'systemPayableDays'),
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
          boosterCalculationAmount: add(
            dataMap?.boosterCalculationAmount || 0,
            formUtils.queryValue(itemTemp?.systemCalculationAmount)
          ),
          boosterDate: [...(dataMap?.boosterDate || []), itemTemp],
        }),
        {}
      ),
      groupBy: self,
      benefitCategory,
    }))
    .value();

export const mapToBenefitItemV2 = (data: any) => {
  return lodash
    .chain(data)
    .groupBy((item) => formUtils.queryValue(item?.benefitItemCode))
    .map((self, selfKey) => ({
      claimDecision: sumDecision(self),
      benefitItemCode: selfKey,
      payableDays: newPayableDays(self),
      systemPayableDays: newPayableDays(self, 'systemPayableDays'),
      ...lodash.reduce(
        self,
        (result: any, reduceItem: any) => ({
          systemCalculationAmount: add(
            result?.systemCalculationAmount || 0,
            formUtils.queryValue(reduceItem?.systemCalculationAmount)
          ),
          payableAmount: add(
            result?.payableAmount || 0,
            formUtils.queryValue(reduceItem?.payableAmount)
          ),
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
      ]),
      sourceId: lodash.map(self, (sourceItem) => sourceItem.id),
    }))
    .value();
};

const relationshipForBenefitType = ({ target, mapKeys }: any) => {
  const extra = lodash.reduce(
    target,
    (result, self): any => {
      const {
        policyNo,
        id,
        benefitTypeCode,
        benefitCategory,
      } = lodash.pick(formUtils.cleanValidateData(self), [
        'policyNo',
        'id',
        'benefitTypeCode',
        'benefitCategory',
      ]);
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

    payableDays: newPayableDays(extra?.children),
    boosterDays: newPayableDays(extra?.boosters),
    boosterSystemDays: newPayableDays(extra?.boosters, 'systemPayableDays'),
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
    systemPayableDays: newPayableDays(extra?.children, 'systemPayableDays'),
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
    boosterSystemAmount: lodash.reduce(
      extra?.boosters,
      (result, reduceItem: any) =>
        add(result, formUtils.queryValue(reduceItem?.systemCalculationAmount)),
      0
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
