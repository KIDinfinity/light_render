import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import {v4 as uuidv4 } from 'uuid';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { Booster } from 'claim/enum/Booster';
import {
  CLAIMPAYABLEITEM,
  TREATMENTPAYABLEITEM,
  ACCIDENT_BENEFIT_PAYABLE_ITEM,
  INVOICEPAYABLEITEM,
  SERVICEPAYABLEITEM,
} from '@/utils/claimConstant';

export const claimPayableAdd = ({ draftState, incidentId, payableId, viewOrder, extra }: any) => {
  const payableAddItem = {
    ...CLAIMPAYABLEITEM,
    claimNo: draftState.claimProcessData.claimNo,
    id: payableId,
    incidentId,
    manualAdd: SwitchEnum.YES,
    viewOrder,
    ...extra,
  };
  draftState.claimEntities.claimPayableListMap[payableId] = {
    ...payableAddItem,
  };
  draftState.claimProcessData.claimPayableList = lodash.uniq([
    ...draftState.claimProcessData.claimPayableList,
    payableId,
  ]);
};

export const treatmentPayableAdd = ({
  draftState,
  incidentId,
  treatmentId,
  payableId,
  treatmentPayableId,
  extra,
}: any) => {
  let expenseAmount = 0;
  const { invoiceList } = draftState.claimEntities?.treatmentListMap?.[treatmentId];
  lodash.map(invoiceList, (invoiceId) => {
    const invoiceItem = draftState.claimEntities.invoiceListMap[invoiceId];
    expenseAmount = add(expenseAmount, formUtils.queryValue(invoiceItem?.expense));
  });
  const TreatmentPayableAddItem = {
    ...TREATMENTPAYABLEITEM,
    claimNo: draftState.claimProcessData.claimNo,
    expenseAmount,
    id: treatmentPayableId,
    payableId,
    incidentId,
    treatmentId,
    manualAdd: SwitchEnum.YES,
    ...extra,
  };

  const treatmentPayableList =
    draftState?.claimEntities?.claimPayableListMap?.[payableId]?.treatmentPayableList || [];
  draftState.claimEntities.claimPayableListMap[payableId] = {
    ...draftState?.claimEntities?.claimPayableListMap?.[payableId],
    treatmentPayableList: lodash.uniq([...treatmentPayableList, treatmentPayableId]),
  };

  draftState.claimEntities.treatmentPayableListMap[treatmentPayableId] = {
    ...TreatmentPayableAddItem,
  };
};

export const accidentBenefitPayableAdd = ({
  draftState,
  incidentId,
  treatmentId,
  payableId,
  treatmentPayableId,
  accidentBenefitItemId,
  extra,
}: any) => {
  const itemAdd = {
    ...ACCIDENT_BENEFIT_PAYABLE_ITEM,
    claimNo: draftState.claimProcessData.claimNo,
    id: accidentBenefitItemId,
    payableId,
    treatmentPayableId,
    incidentId,
    treatmentId,
    manualAdd: SwitchEnum.YES,
    ...extra,
  };

  const accidentBenefitPayableList =
    draftState?.claimEntities?.treatmentPayableListMap?.[treatmentPayableId]
      ?.accidentBenefitPayableList || [];
  draftState.claimEntities.treatmentPayableListMap[treatmentPayableId] = {
    ...draftState?.claimEntities?.treatmentPayableListMap?.[treatmentPayableId],
    accidentBenefitPayableList: lodash.uniq([...accidentBenefitPayableList, accidentBenefitItemId]),
  };

  draftState.claimEntities.accidentBenefitPayableListMap[accidentBenefitItemId] = {
    ...itemAdd,
  };
};

export const invoicePayableAdd = ({
  draftState,
  incidentId,
  treatmentId,
  payableId,
  invoiceId,
  treatmentPayableId,
  invoicePayableId,
  extra,
}: any) => {
  const expense = draftState.claimEntities.invoiceListMap[invoiceId]?.expense;
  const itemAdd = {
    ...INVOICEPAYABLEITEM,
    claimNo: draftState.claimProcessData.claimNo,
    expenseAmount: expense,
    id: invoicePayableId,
    incidentId,
    invoiceId,
    treatmentId,
    payableId,
    treatmentPayableId,
    manualAdd: SwitchEnum.YES,
    ...extra,
  };

  const invoicePayableList =
    draftState?.claimEntities?.treatmentPayableListMap?.[treatmentPayableId]?.invoicePayableList ||
    [];
  draftState.claimEntities.treatmentPayableListMap[treatmentPayableId] = {
    ...draftState?.claimEntities?.treatmentPayableListMap?.[treatmentPayableId],
    invoicePayableList: lodash.uniq([...invoicePayableList, invoicePayableId]),
  };

  draftState.claimEntities.invoicePayableListMap[invoicePayableId] = {
    ...itemAdd,
  };
};

export const servicePayableAdd = ({
  draftState,
  incidentId,
  treatmentId,
  payableId,
  invoiceId,
  serviceItemId,
  isAdjustment,
  treatmentPayableId,
  invoicePayableId,
  servicePayableId,
  extra,
}: any) => {
  const expense = formUtils.queryValue(
    draftState.claimEntities.serviceItemListMap[serviceItemId]?.expense
  );

  const itemAdd = {
    ...SERVICEPAYABLEITEM,
    calculationAmount: expense,
    claimNo: draftState.claimProcessData.claimNo,
    expenseAmount: expense,
    id: servicePayableId,
    incidentId,
    invoiceId,
    serviceItemId,
    treatmentId,
    payableId,
    treatmentPayableId,
    invoicePayableId,
    isAdjustment,
    manualAdd: SwitchEnum.YES,
    ...extra,
  };

  const serviceItemPayableList =
    draftState?.claimEntities?.invoicePayableListMap?.[invoicePayableId]?.serviceItemPayableList ||
    [];

  draftState.claimEntities.invoicePayableListMap[invoicePayableId] = {
    ...draftState?.claimEntities?.invoicePayableListMap?.[invoicePayableId],
    serviceItemPayableList: lodash.uniq([...serviceItemPayableList, servicePayableId]),
  };

  draftState.claimEntities.serviceItemPayableListMap[servicePayableId] = {
    ...itemAdd,
  };
};

const creatReimbursement = ({
  draftState,
  incidentId,
  treatmentId,
  serviceItemId,
  extra,
  isAdjustment,
}: any) => {
  const invoicePayableItem = lodash.find(
    formUtils.cleanValidateData(draftState.claimEntities.invoicePayableListMap),
    {
      incidentId,
      treatmentId,
      productCode: extra.productCode,
      policyNo: extra?.policyNo,
      benefitTypeCode: extra?.benefitTypeCode,
    }
  );
  const treatmentPayableItem = lodash.find(
    formUtils.cleanValidateData(draftState.claimEntities.treatmentPayableListMap),
    {
      incidentId,
      treatmentId,
      productCode: extra.productCode,
      policyNo: extra?.policyNo,
      benefitTypeCode: extra?.benefitTypeCode,
    }
  );
  const claimPayableItem = lodash.find(
    formUtils.cleanValidateData(draftState.claimEntities.claimPayableListMap),
    {
      incidentId,
      productCode: extra.productCode,
      policyNo: extra?.policyNo,
      benefitTypeCode: extra?.benefitTypeCode,
    }
  );

  const sourcePayableId =
    invoicePayableItem?.payableId || treatmentPayableItem?.payableId || claimPayableItem?.id;
  const payableId = sourcePayableId || uuidv4();
  const viewOrderMax: number = lodash
    .chain(draftState.claimEntities.claimPayableListMap)
    .map((item) => item)
    .maxBy('viewOrder')
    .value()?.viewOrder;
  const viewOrder = lodash.isNil(viewOrderMax) ? add(viewOrderMax, 1) : 1;

  const sourceTreatmentPayableId =
    invoicePayableItem?.treatmentPayableId || treatmentPayableItem?.id;
  const treatmentPayableId = sourceTreatmentPayableId || uuidv4();

  const invoicePayableId = invoicePayableItem?.id || uuidv4();
  const invoiceId = draftState.claimEntities?.serviceItemListMap?.[serviceItemId]?.invoiceId;

  const servicePayableId = uuidv4();

  if (!sourcePayableId) claimPayableAdd({ draftState, incidentId, payableId, viewOrder, extra });
  if (!sourceTreatmentPayableId)
    treatmentPayableAdd({
      draftState,
      incidentId,
      treatmentId,
      payableId,
      treatmentPayableId,
      extra,
    });
  if (!invoicePayableItem?.id)
    invoicePayableAdd({
      draftState,
      incidentId,
      treatmentId,
      invoiceId,
      payableId,
      treatmentPayableId,
      invoicePayableId,
      extra,
    });
  servicePayableAdd({
    draftState,
    incidentId,
    treatmentId,
    invoiceId,
    payableId,
    treatmentPayableId,
    invoicePayableId,
    servicePayableId,
    serviceItemId,
    isAdjustment,
    extra,
  });
  return payableId;
};

const handleAdd = {
  [eBenefitCategory.Cashless]: ({ draftState, incidentId, treatmentId, extra }: any) => {
    const claimPayableItem = lodash.find(
      formUtils.cleanValidateData(draftState.claimEntities.claimPayableListMap),
      {
        incidentId,
        productCode: extra.productCode,
        policyNo: extra?.policyNo,
        benefitTypeCode: extra?.benefitTypeCode,
      }
    );
    const payableId = claimPayableItem?.id || uuidv4();
    const viewOrderMax: number = lodash
      .chain(draftState.claimEntities.claimPayableListMap)
      .map((item) => item)
      .maxBy('viewOrder')
      .value()?.viewOrder;
    const viewOrder = lodash.isNil(viewOrderMax) ? add(viewOrderMax, 1) : 1;

    const treatmentPayableId = uuidv4();
    if (!claimPayableItem?.id)
      claimPayableAdd({ draftState, incidentId, payableId, viewOrder, extra });
    treatmentPayableAdd({
      draftState,
      incidentId,
      treatmentId,
      payableId,
      treatmentPayableId,
      extra: {
        ...extra,
        assessorOverrideAmount: extra?.payableAmount,
      },
    });
    return payableId;
  },
  [eBenefitCategory.Aipa]: ({ draftState, incidentId, treatmentId, extra }: any) => {
    const treatmentPayableItem = lodash.find(
      formUtils.cleanValidateData(draftState.claimEntities.treatmentPayableListMap),
      {
        incidentId,
        treatmentId,
        productCode: extra.productCode,
        policyNo: extra?.policyNo,
        benefitTypeCode: extra?.benefitTypeCode,
      }
    );
    const claimPayableItem = lodash.find(
      formUtils.cleanValidateData(draftState.claimEntities.claimPayableListMap),
      {
        incidentId,
        productCode: extra.productCode,
        policyNo: extra?.policyNo,
        benefitTypeCode: extra?.benefitTypeCode,
      }
    );

    const sourcePayableId = treatmentPayableItem?.payableId || claimPayableItem?.id;
    const payableId = sourcePayableId || uuidv4();
    const viewOrderMax: number = lodash
      .chain(draftState.claimEntities.claimPayableListMap)
      .map((item) => item)
      .maxBy('viewOrder')
      .value()?.viewOrder;
    const viewOrder = lodash.isNil(viewOrderMax) ? add(viewOrderMax, 1) : 1;

    const treatmentPayableId = treatmentPayableItem?.id || uuidv4();

    const accidentBenefitItemId = uuidv4();
    if (!sourcePayableId) claimPayableAdd({ draftState, incidentId, payableId, viewOrder, extra });
    if (!treatmentPayableItem?.id)
      treatmentPayableAdd({
        draftState,
        incidentId,
        treatmentId,
        payableId,
        treatmentPayableId,
        extra,
      });
    accidentBenefitPayableAdd({
      draftState,
      incidentId,
      treatmentId,
      payableId,
      treatmentPayableId,
      accidentBenefitItemId,
      extra: {
        ...extra,
        assessorOverrideAmount: extra?.payableAmount,
      },
    });
    return payableId;
  },
  [eBenefitCategory.Reimbursement]: ({ draftState, incidentId, treatmentId, extra }: any) => {
    if (
      extra?.booster === Booster.No ||
      (extra?.booster === Booster.Yes &&
        (lodash.isNumber(extra.boosterAmount) || lodash.isNumber(extra.boosterDays)))
    ) {
      return creatReimbursement({
        draftState,
        incidentId,
        treatmentId: extra?.treatmentId || treatmentId,
        serviceItemId: extra?.serviceItemId,
        serviceItem: extra.serviceItem,
        isAdjustment: extra?.isAdjustment,
        extra: {
          ...extra,
          payableAmount:
            (extra?.booster === Booster.No ? extra.payableAmount : extra.boosterAmount) || 0,
          assessorOverrideAmount:
            (extra?.booster === Booster.No ? extra.payableAmount : extra.boosterAmount) || 0,
          payableDays: extra?.booster === Booster.No ? extra.payableDays : extra.boosterDays,
        },
      });
    }
    return '';
  },
};

// TODO:extra传了一些无用参数进来,应该筛选
export const basicCreate = ({ draftState, incidentId, treatmentId, extra }: any) => {
  if (lodash.isFunction(handleAdd?.[extra?.benefitCategory])) {
    const excludeKeys = ['id'];
    return handleAdd?.[extra?.benefitCategory]({
      draftState,
      incidentId,
      treatmentId,
      extra: lodash.omit(extra, excludeKeys),
    });
  }
};
