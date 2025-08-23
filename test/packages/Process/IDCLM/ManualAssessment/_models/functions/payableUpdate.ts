import lodash from 'lodash';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const updateFields = ['boosterAmount', 'boosterDays', 'payableAmount', 'payableDays'];

const updateHandler = {
  [eBenefitCategory.Cashless]: ({ draftState, extra }: any) => {
    const { treatmentPayableId, payableAmount, payableDays } =
      lodash.pick(extra, updateFields.concat(['treatmentPayableId'])) || {};

    const updatePayableItem = lodash.get(
      draftState,
      `claimEntities.treatmentPayableListMap.${treatmentPayableId}`
    );

    lodash.set(draftState, `claimEntities.treatmentPayableListMap.${treatmentPayableId}`, {
      ...updatePayableItem,
      payableAmount,
      payableDays,
    });

    return lodash.get(
      draftState,
      `claimEntities.treatmentPayableListMap.${treatmentPayableId}.payableId`
    );
  },
  [eBenefitCategory.Aipa]: ({ draftState, extra }: any) => {
    const { accidentBenefitPayableId, payableAmount, payableDays } =
      lodash.pick(extra, updateFields.concat(['accidentBenefitPayableId'])) || {};

    const updatePayableItem = lodash.get(
      draftState,
      `claimEntities.accidentBenefitPayableListMap.${accidentBenefitPayableId}`
    );

    lodash.set(
      draftState,
      `claimEntities.accidentBenefitPayableListMap.${accidentBenefitPayableId}`,
      {
        ...updatePayableItem,
        payableAmount,
        payableDays,
      }
    );

    return lodash.get(
      draftState,
      `claimEntities.accidentBenefitPayableListMap.${accidentBenefitPayableId}.payableId`
    );
  },
  [eBenefitCategory.Reimbursement]: ({ draftState, extra, service }: any) => {
    const { booster } = extra || {};
    if (
      booster === 'N' ||
      (booster === 'Y' &&
        (lodash.isNumber(extra.boosterAmont) || lodash.isNumber(extra.boosterDays)))
    ) {
      const {
        servicePayableId,
        payableId,
        payableAmount,
        payableDays,
        boosterAmount,
        boosterDays,
      } = lodash.pick(extra, updateFields.concat(['servicePayableId'])) || {};

      const updatePayableItem = lodash.get(
        draftState,
        `claimEntities.serviceItemPayableListMap.${servicePayableId}`
      );

      lodash.set(draftState, `claimEntities.serviceItemPayableListMap.${servicePayableId}`, {
        ...updatePayableItem,
        payableAmount: (booster === 'N' ? payableAmount : boosterAmount) || 0,
        assessorOverrideAmount: (booster === 'N' ? payableAmount : boosterAmount) || 0,
        payableDays: booster === 'N' ? payableDays : boosterDays,
        boosterAmount,
        boosterDays,
      });
      return payableId;
    }
  },
};

export const payableUpdate = ({ draftState, extra }: any) => {
  if (lodash.isFunction(updateHandler?.[extra?.benefitCategory])) {
    updateHandler?.[extra?.benefitCategory]({
      draftState,
      extra,
    });
  }
};

export default payableUpdate;
