import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eClaimDecision } from 'claim/enum/claimDecision';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { Booster } from 'claim/enum/Booster';
import { add, subtract } from '@/utils/precisionUtils';

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
  return formUtils.queryValue(prex) >= formUtils.queryValue(next)
    ? formUtils.queryValue(prex)
    : formUtils.queryValue(next);
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

      temp.calculationAmount = add(
        result.calculationAmount,
        formUtils.queryValue(item?.calculationAmount)
      );
      temp.insurerCoInsuranceAmount = add(
        result.insurerCoInsuranceAmount,
        formUtils.queryValue(item?.insurerCoInsuranceAmount)
      );
      temp.payableAmount = add(result.payableAmount, formUtils.queryValue(item?.payableAmount));
      temp.uncoverAmount = subtract(temp.calculationAmount, temp?.payableAmount);
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
      calculationAmount: 0,
      insurerCoInsuranceAmount: 0,
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
          calculationAmount: add(
            result?.calculationAmount || 0,
            formUtils.queryValue(reduceItem?.calculationAmount)
          ),
          insurerCoInsuranceAmount: add(
            result?.insurerCoInsuranceAmount || 0,
            formUtils.queryValue(reduceItem?.insurerCoInsuranceAmount)
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
        (dataMap: any, itemTemp: any) => {
          return {
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
            boosterDate: itemTemp,
          };
        },
        {}
      ),
      groupBy: self,
      benefitCategory,
    }))
    .value();

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
    calculationAmount: lodash.max(
      lodash.map(extra?.children, (item: any) => formUtils.queryValue(item?.calculationAmount))
    ),
    insurerCoInsuranceAmount: lodash.reduce(
      extra?.children,
      (result, reduceItem: any) =>
        add(result, formUtils.queryValue(reduceItem?.insurerCoInsuranceAmount)),
      0
    ),
  };
};

export const mapToBenefitTypeNew = ({ source, mapKeys }: any) =>
  lodash
    .chain(source)
    .groupBy((item) => formUtils.queryValue(item?.benefitTypeCode))
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
      ]),
      groupBy: item,
      viewOrder: lodash.minBy(item, 'viewOrder')?.viewOrder,
      ...relationshipForBenefitType({ target: item, mapKeys }),
    }))
    .orderBy('viewOrder')
    .value();
