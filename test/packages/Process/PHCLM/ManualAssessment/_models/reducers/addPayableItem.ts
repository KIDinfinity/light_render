import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { BenefitCategoryEnum, Payable } from 'process/Utils/Payable';
import { getPolicyItem } from 'basic/utils/PolicyUtils';
import moment from 'moment';

interface BenefitItem {
  benefitCategory: string;
  benefitItemCode: string;
  coverageKey: string;
  coreProductCode: string;
  policyCurrency: string;
  productPlan: string;
  listMap: any;
}

const defaultMap = [
  'policyNo',
  'benefitItemCode',
  'coreProductCode',
  'policyCurrency',
  'productPlan',
  'policySource',
];

const addExtraClaimPayableData = ({
  draftState: { claimEntities },
  benefitCategory,
  basic: { incidentId },
  policyItem: { policySource, calculationAmount, beyondNel, issueEffectiveDate },
  claimPayableItem,
}: any) => {
  const { incidentDate } = claimEntities?.incidentListMap?.[incidentId] || {};
  const lateTwoYear = !incidentDate
    ? true
    : moment(formUtils.queryValue(incidentDate)).diff(moment(issueEffectiveDate), 'years') < 2;
  const { _data } = moment.duration(moment(incidentDate).diff(moment(issueEffectiveDate)));

  return benefitCategory === BenefitCategoryEnum.Life
    ? {
        ...claimPayableItem,
        contestableClaim: lateTwoYear,
        beyondNEL: policySource === 'G' && Number(calculationAmount) > Number(beyondNel),
        policyDuration: `${_data.years}year(s)${_data.months}month(s)`,
      }
    : {
        ...claimPayableItem,
        contestableClaim: lateTwoYear,
        policyDuration: `${_data.years}year(s)${_data.months}month(s)`,
      };
};

/**
 * 获取需要操作的数
 * 1.遍历benefitListMap,拿到listMap
 * 2.遍历listMap,筛选出选中的列表,并且拿到childrenMap
 * 3.遍历childrenMap,对每一项设置额外的值(通过draftState.listPolicy去匹配)
 * 4.返回所有childrenList列表
 */
function getChoiceList(
  benefitListMap: Record<string, BenefitItem>,
  draftState: any,
  policyNo: string,
  claimDecision: string
) {
  if (!benefitListMap || typeof benefitListMap !== 'object') {
    return [];
  }

  return Object.values(benefitListMap)
    .flatMap((benefitItem) =>
      Object.values(benefitItem.listMap).flatMap((listItem: any) => {
        if (
          benefitItem?.benefitCategory === BenefitCategoryEnum.Reimbursement &&
          !formUtils.queryValue(listItem.chooise)
        ) {
          return [];
        }

        return Object.values(listItem.childrenMap).flatMap((childItem: any) => {
          const { policyYear } = childItem;
          const { benefitCategory, benefitItemCode, coreProductCode, productPlan } = benefitItem;

          const policyItem = getPolicyItem({
            listPolicy: draftState.listPolicy,
            policyNo,
            benefitItemCode,
            coreProductCode,
            productPlan,
            benefitCategory,
            policyYear,
          });

          const { coreProductCode: productCode, ...extra } = lodash.pick(policyItem, [
            ...defaultMap,
            'coverageKey',
            'benefitTypeCode',
            'benefitCategory',
            'isStandaloneBooster',
            'unitType',
            'calculationAmount',
            'memberNo',
          ]);

          return {
            extra: {
              ...extra,
              ...formUtils.cleanValidateData(childItem),
              productCode,
              claimDecision,
              benefitCategory,
            },
            isUpdate: childItem.isUpdate,
            policyItem,
          };
        });
      })
    )
    .filter(Boolean);
}

const addPayableItem = (state: any, action: any) => {
  const { benefitListMap, basic } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.showRegisterAlert = true;

    const { incidentId, treatmentId, policyNo, claimDecision } = formUtils.cleanValidateData(basic);

    const choiceList = getChoiceList(benefitListMap, draftState, policyNo, claimDecision);

    /**
     * 添加或者修改数据到payable
     */

    choiceList.forEach((choiceItem: any) => {
      const {
        policyItem,
        isUpdate,
        extra: { benefitCategory },
      } = choiceItem;

      if (!isUpdate) {
        /**
         * 新增payable
         * 1. 设置调用方法需要的参数
         * 2. 配置不同类型调用不同方法
         * 3. 调用对应新增方法返回新创建的对象
         * 4. 存储draftState数据
         */

        const params = {
          claimEntities: formUtils.cleanValidateData(draftState.claimEntities),
          claimProcessData: formUtils.cleanValidateData(draftState.claimProcessData),
          // update的时候incidentId/treatmentId不需要传
          incidentId,
          treatmentId,
          extra: {
            ...lodash.omit(choiceItem.extra, ['id']),
          },
        };
        if (benefitCategory === BenefitCategoryEnum.Life) {
          const reimbursementPercentage =
            draftState?.reimbursementPercentageMap?.[
              `${choiceItem.extra.policyNo}-${choiceItem.extra.benefitTypeCode}-${choiceItem.extra.benefitItemCode}`
            ];
          params.extra.reimbursementPercentage =
            lodash.isUndefined(reimbursementPercentage) || lodash.isNull(reimbursementPercentage)
              ? null
              : reimbursementPercentage;
          if (
            lodash.isUndefined(choiceItem.extra.payableAmount) ||
            lodash.isNull(choiceItem.extra.payableAmount)
          ) {
            params.extra.payableAmount =
              lodash.isUndefined(reimbursementPercentage) || lodash.isNull(reimbursementPercentage)
                ? null
                : (Number(reimbursementPercentage) * Number(choiceItem.extra.calculationAmount)) /
                  100;
          }
        }
        const configs = {
          [BenefitCategoryEnum.Aipa]: () => Payable.addAipaPayable(params),
          [BenefitCategoryEnum.Cashless]: () => Payable.addCashlessPayable(params),
          [BenefitCategoryEnum.Reimbursement]: () => Payable.addReimbursementPayable(params),
          [BenefitCategoryEnum.S]: () => Payable.addProcedurePayable(params),
          [BenefitCategoryEnum.Crisis]: () => Payable.addOtherProcedurePayable(params),
          [BenefitCategoryEnum.Life]: () => Payable.addLife(params),
        };
        if (lodash.isFunction(configs[benefitCategory])) {
          const addBaseData = configs[benefitCategory]();

          Payable.changeAddData({
            draftState,
            addData: {
              ...addBaseData,
              claimPayableItem: addExtraClaimPayableData({
                draftState,
                basic,
                benefitCategory,
                policyItem,
                claimPayableItem: lodash.isEmpty(addBaseData.claimPayableItem)
                  ? draftState.claimEntities?.claimPayableListMap?.[addBaseData?.payableId]
                  : {
                      ...addBaseData.claimPayableItem,
                      isNewPayable: draftState.claimProcessData?.appeal,
                    },
                incidentItem: draftState.claimEntities.incidentListMap[incidentId],
              }),
            },
          });
        }
      } else {
        /**
         * 更新payable
         * 1. 设置调用方法需要的参数
         * 2. 配置不同类型调用不同方法
         * 3. 调用对应更新方法返回新创建的对象(存储draftState数据)
         */
        const params = {
          draftState,
          updateFields: ['boosterAmount', 'boosterDays', 'payableAmount', 'payableDays'],
          extra: {
            ...choiceItem.extra,
          },
        };

        const configs = {
          [BenefitCategoryEnum.Aipa]: () => Payable.updateAipaPayableData(params),
          [BenefitCategoryEnum.Cashless]: () => Payable.updateCashlessPayableData(params),
          [BenefitCategoryEnum.Reimbursement]: () => Payable.updateReimbursementPayableData(params),
          [BenefitCategoryEnum.S]: () => Payable.updateProcedurePayableData(params),
          [BenefitCategoryEnum.Crisis]: () => Payable.updateOtherProcedurePayableData(params),
          [BenefitCategoryEnum.Life]: () => Payable.addLife(params),
        };

        if (lodash.isFunction(configs[benefitCategory])) {
          configs[benefitCategory]();
        }
      }
    });
  });
  return { ...nextState };
};

export default addPayableItem;
