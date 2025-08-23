import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Booster } from 'claim/enum/Booster';
import { BenefitCategoryEnum, SwitchEnum, Payable } from 'process/Utils/Payable';
import { updateClaimPolicyPayableFun } from '../functions';
import { getPolicyItem } from 'basic/utils/PolicyUtils';

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

          const {
            coreProductCode: productCode,
            ncdFlag,
            ...extra
          } = lodash.pick(policyItem, [
            ...defaultMap,
            'coverageKey',
            'benefitCategory',
            'isStandaloneBooster',
            'unitType',
            'ncdFlag',
          ]);

          const boosterItem = lodash.find(draftState.listPolicy, {
            ...lodash.pick(policyItem, defaultMap),
            booster: Booster.Yes,
          });

          return formUtils.cleanValidateData({
            extra: {
              ...childItem,
              ...extra,
              productCode,
              benefitTypeCode,
              claimDecision,
            },
            ncdFlag,
            isUpdate: childItem.isUpdate,
            boosterExtra: !lodash.isEmpty(boosterItem)
              ? {
                  ...lodash.pick(boosterItem, [
                    ...defaultMap,
                    'benefitTypeCode',
                    'benefitCategory',
                    'coverageKey',
                  ]),
                  productCode: boosterItem.coreProductCode,
                }
              : {},
          });
        });
      })
    )
    .filter(Boolean);
}

const addPayableItem = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { basic, benefitListMap }: any = formUtils.formatFlattenValue(
      formUtils.cleanValidateData(draftState.popUpPayable),
      true
    );

    const { incidentId, treatmentId, policyNo, claimDecision, benefitTypeCode } = basic;

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
      let boosterPayableId = '';

      const { extra, isUpdate, boosterExtra } = choiceItem;
      const { benefitCategory, isStandaloneBooster } = extra || {};

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
          incidentId,
          treatmentId,
          extra: {
            ...lodash.omit(choiceItem.extra, ['id']),
          },
        };
        const configs = {
          [BenefitCategoryEnum.Aipa]: () => Payable.addAipaPayable(params),
          [BenefitCategoryEnum.Cashless]: () => Payable.addCashlessPayable(params),
          [BenefitCategoryEnum.Reimbursement]: () => Payable.addReimbursementPayable(params),
          [BenefitCategoryEnum.S]: () => Payable.addProcedurePayable(params),
          [BenefitCategoryEnum.Crisis]: () => Payable.addOtherProcedurePayable(params),
        };
        if (lodash.isFunction(configs[benefitCategory])) {
          // 只有booster类型
          if (isStandaloneBooster === SwitchEnum.YES) {
            if (!lodash.isEmpty(boosterExtra)) {
              // 新增booster
              params.extra = {
                ...params.extra,
                ...boosterExtra,
                payableDays: extra.boosterDays,
                payableAmount: extra.boosterAmount,
                booster: SwitchEnum.YES,
              };
              const addBoosterData = configs[benefitCategory]();

              boosterPayableId = addBoosterData.payableId;
              Payable.changeAddData({
                draftState,
                addData: addBoosterData,
              });
            }
          } else {
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

              const addBoosterData = configs[benefitCategory]();

              boosterPayableId = addBoosterData.payableId;
              Payable.changeAddData({
                draftState,
                addData: addBoosterData,
              });
            }
          }
        }
        updateClaimPolicyPayableFun.updateNCDFlag(draftState, {
          policyNo: extra.policyNo,
          ncdFlag: choiceItem.ncdFlag,
        }, { isAdd: true });
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
            booster: Booster.No,
          },
        };

        const configs = {
          [BenefitCategoryEnum.Aipa]: () => Payable.updateAipaPayableData(params),
          [BenefitCategoryEnum.Cashless]: () => Payable.updateCashlessPayableData(params),
          [BenefitCategoryEnum.Reimbursement]: () => Payable.updateReimbursementPayableData(params),
          [BenefitCategoryEnum.S]: () => Payable.updateProcedurePayableData(params),
          [BenefitCategoryEnum.Crisis]: () => Payable.updateOtherProcedurePayableData(params),
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
