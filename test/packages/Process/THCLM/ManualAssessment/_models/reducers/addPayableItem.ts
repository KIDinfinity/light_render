import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Booster } from 'claim/enum/Booster';
import { basicCreate } from '../functions/payableAdd';
import { payableUpdate } from '../functions/payableUpdate';

const addPayableItem = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { basic, benefitListMap }: any = formUtils.formatFlattenValue(
      formUtils.cleanValidateData(draftState.popUpPayable)
    );
    const defaultMap = [
      'policyNo',
      'benefitItemCode',
      'coreProductCode',
      'policyCurrency',
      'productPlan',
    ];

    const { incidentId, policyNo, benefitTypeCode } = basic;

    lodash.values(benefitListMap).forEach((item: any) => {
      const {
        benefitCategory,
        benefitItemCode,
        coreProductCode,
        isUpdate,
        policyCurrency,
        productPlan,
      } = item;

      const policyItem = lodash.find(draftState.listPolicy, {
        policyNo,
        benefitItemCode,
        coreProductCode,
        policyCurrency,
        productPlan,
        benefitTypeCode,
        benefitCategory,
      });

      const { coreProductCode: productCode, ...extra } = lodash.pick(policyItem, [
        ...defaultMap,
        'coverageKey',
        'benefitTypeCode',
        'benefitCategory',
      ]);

      const bootsterItem = lodash.find(draftState.listPolicy, {
        ...lodash.pick(policyItem, defaultMap),
        booster: Booster.Yes,
      });

      lodash.values(item?.listMap || []).forEach((mapItem: any) => {
        if (mapItem?.chooise) {
          const basicPayableId = mapItem?.isUpdate
            ? payableUpdate({
                draftState,
                extra: {
                  ...extra,
                  ...mapItem,
                  productCode,
                  booster: Booster.No,
                },
              })
            : basicCreate({
                draftState,
                incidentId,
                treatmentId: mapItem?.id,
                extra: {
                  ...extra,
                  ...mapItem,
                  productCode,
                  booster: Booster.No,
                },
              });

          // 新增booster
          const { ...boosterExtra } = bootsterItem;
          const boosterPayableId = isUpdate
            ? payableUpdate({
                draftState,
                ...boosterExtra,
                ...mapItem,
                booster: Booster.Yes,
              })
            : basicCreate({
                draftState,
                incidentId,
                treatmentId: mapItem?.id,
                ...boosterExtra,
                ...mapItem,
                booster: Booster.Yes,
              });

          const { claimDecision, denyCode, denyReason, exGratiaCode, exGratiaReason } =
            draftState.claimEntities?.claimPayableListMap?.[basicPayableId] || {};
          if (basicPayableId) {
            draftState.claimEntities.claimPayableListMap[basicPayableId] = {
              ...draftState.claimEntities?.claimPayableListMap?.[basicPayableId],
              claimDecision: formUtils.queryValue(claimDecision) === 'D' ? 'A' : claimDecision,
            };
          }
          if (boosterPayableId) {
            draftState.claimEntities.claimPayableListMap[boosterPayableId] = {
              ...draftState.claimEntities?.claimPayableListMap?.[boosterPayableId],
              claimDecision: formUtils.queryValue(claimDecision) === 'D' ? 'A' : claimDecision,
              denyCode,
              denyReason,
              exGratiaCode,
              exGratiaReason,
            };
          }
        }
      });
    });
  });
  return { ...nextState };
};

export default addPayableItem;
