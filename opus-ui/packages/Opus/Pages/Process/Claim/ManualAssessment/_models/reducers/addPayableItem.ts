import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Booster } from 'claim/enum/Booster';
import { BenefitCategoryEnum, SwitchEnum, Payable } from 'process/Utils/Payable';
import { getPolicyItem } from 'basic/utils/PolicyUtils';
import { BenefitSubCategory } from 'claim/pages/utils/claim';

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
  'coverageKey',
  'benefitCategory',
  'benefitSubCategory',
  'isStandaloneBooster',
  'unitType',
  'mainProductCode',
];

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
  claimDecision: string,
  benefitTypeCode: string
) {
  if (!benefitListMap || typeof benefitListMap !== 'object') {
    return [];
  }

  return Object.values(benefitListMap)
    .flatMap((benefitItem) =>
      Object.values(benefitItem.listMap).flatMap((listItem: any) => {
        if (!formUtils.queryValue(listItem.chooise)) {
          return [];
        }

        return Object.values(listItem?.childrenMap).flatMap((childItem: any) => {
          const { policyYear, payableAmount: assessorOverrideAmount } = childItem;
          const {
            benefitCategory,
            benefitItemCode,
            coreProductCode,
            productPlan,
            benefitSubCategory,
          } = benefitItem;

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
          ]);

          return formUtils.cleanValidateData({
            extra: {
              benefitSubCategory,
              benefitCategory,
              ...childItem,
              ...extra,
              productCode,
              benefitTypeCode,
              claimDecision,
              assessorOverrideAmount,
            },
            isUpdate: childItem.isUpdate,
          });
        });
      })
    )
    .filter(Boolean);
}

const addPayableItem = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { basic, benefitListMap }: any = formUtils.formatFlattenValue(
      formUtils.cleanValidateData(draftState.popUpPayable)
    );

    const { policyNo, claimDecision, benefitTypeCode } = basic;

    const choiceList = getChoiceList(
      benefitListMap,
      draftState,
      policyNo,
      claimDecision,
      benefitTypeCode
    );
    /**
     * 添加或者修改数据到payable
     */

    choiceList.forEach((choiceItem: any) => {
      let basePayableId = '';
      const boosterPayableId = '';

      const { extra, isUpdate, boosterExtra } = choiceItem;
      const { benefitCategory, benefitSubCategory } = extra || {};

      if (!isUpdate) {
        /**
         * 新增payable
         * 1. 设置调用方法需要的参数
         * 2. 配置不同类型调用不同方法
         * 3. 调用对应新增方法返回新创建的对象
         * 4. 存储draftState数据
         * 5. 如果是booster以上操作重新走一遍
         */

        const params = {
          claimEntities: formUtils.cleanValidateData(draftState.claimEntities),
          claimProcessData: formUtils.cleanValidateData(draftState.claimProcessData),
          // update的时候incidentId/treatmentId不需要传
          extra: {
            ...lodash.omit(choiceItem.extra, ['id']),
          },
        };
        const configs = {
          [BenefitCategoryEnum.Life]: () => Payable.addLife(params),
          [BenefitCategoryEnum.MIC]: () => Payable.addMajorIllnessCashPayable(params),
          [BenefitCategoryEnum.Aipa]: () => Payable.addAipaPayable(params),
          [BenefitCategoryEnum.Cashless]: () =>
            benefitSubCategory === BenefitSubCategory.OP
              ? Payable.addCashlessOPTreatmentPayable(params)
              : Payable.addCashlessPayable(params),
          [BenefitCategoryEnum.Reimbursement]: () => Payable.addReimbursementPayable(params),
          [BenefitCategoryEnum.S]: () => Payable.addProcedurePayable(params),
          [BenefitCategoryEnum.Crisis]: () => Payable.addOtherProcedurePayable(params),
          [BenefitCategoryEnum.CIC]: () => Payable.addOtherProcedurePayable(params),
          [BenefitCategoryEnum.T]: () => Payable.addOtherProcedurePayable(params),
        };
        if (lodash.isFunction(configs[benefitCategory])) {
          params.extra = {
            ...params.extra,
            booster: SwitchEnum.NO,
          };
          const addBaseData = configs[benefitCategory]();
          basePayableId = addBaseData.payableId;
          Payable.changeAddData({ draftState, addData: addBaseData });

          if (
            !lodash.isEmpty(boosterExtra) &&
            benefitCategory === BenefitCategoryEnum.Reimbursement
          ) {
            // 新增booster
            params.extra = {
              ...params.extra,
              ...boosterExtra,
              payableDays: extra.boosterDays,
              payableAmount: extra.boosterAmount,
              booster: SwitchEnum.YES,
            };
          }
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
          updateFields: [
            'boosterAmount',
            'boosterDays',
            'payableAmount',
            'payableDays',
            'reimbursementMultiple',
          ],
          extra: {
            ...choiceItem.extra,
            booster: Booster.No,
          },
        };

        const configs = {
          [BenefitCategoryEnum.Aipa]: () => Payable.updateAipaPayableData(params),
          [BenefitCategoryEnum.Cashless]: () =>
            benefitSubCategory === BenefitSubCategory.OP
              ? Payable.updateOPTreatmentPayableData(params)
              : Payable.updateCashlessPayableData(params),
          [BenefitCategoryEnum.Reimbursement]: () => Payable.updateReimbursementPayableData(params),
          [BenefitCategoryEnum.S]: () => Payable.updateProcedurePayableData(params),
          [BenefitCategoryEnum.Crisis]: () => Payable.updateOtherProcedurePayableData(params),
          [BenefitCategoryEnum.CIC]: () => Payable.updateOtherProcedurePayableData(params),
          [BenefitCategoryEnum.T]: () => Payable.updateOtherProcedurePayableData(params),
          [BenefitCategoryEnum.Life]: () => Payable.updateLifePayableData(params),
          [BenefitCategoryEnum.MIC]: () => Payable.updateMajorIllnessCashPayableData(params),
        };

        if (lodash.isFunction(configs[benefitCategory])) {
          configs[benefitCategory]();
          // 更新booster
          params.extra = {
            ...extra,
            ...boosterExtra,
            booster: SwitchEnum.YES,
          };

          configs[benefitCategory]();
        }
      }

      // 重新追加booster的的数据(这个可不可以在更改数据方法(add/update)里面直接做了)
      const { denyCode, denyReason, exGratiaCode, exGratiaReason } =
        draftState.claimEntities?.claimPayableListMap?.[basePayableId] || {};

      if (boosterPayableId) {
        // eslint-disable-next-line no-param-reassign
        draftState.claimEntities.claimPayableListMap[boosterPayableId] = {
          ...draftState.claimEntities?.claimPayableListMap?.[boosterPayableId],
          denyCode,
          denyReason,
          exGratiaCode,
          exGratiaReason,
        };
      }
    });
  });
  return { ...nextState };
};

export default addPayableItem;
