import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { getFilterData } from './Utils';
import {
  addClaimPayable,
  addTreatmentPayable,
  addAccidentBenefitPayable,
  addInvoicePayable,
  addServicePayable,
  addProcedurePayable,
  addOtherProcedurePayable,
  addLifePayable,
} from './Options';

/**
 * TODO:
 * 1.update的时候basePayableId和boostr为空这是正确的吗
 * 2.extra.boosterAmount) || lodash.isNumber(extra.boosterDays 为null 并且不给编辑是正确的吗
 */

export default {
  // 获取新增A类型payable
  addAipaPayable: (params: any) => {
    const { incidentId, treatmentId, claimEntities, claimProcessData, extra } = params;
    const { claimPayableListMap, treatmentListMap, treatmentPayableListMap, invoiceListMap } =
      claimEntities;
    const { claimNo } = claimProcessData;

    const treatmentPayableItem: any = getFilterData({
      filterName: treatmentPayableListMap,
      params,
      extraScreen: { treatmentId },
    });
    const claimPayableItem: any = getFilterData({ filterName: claimPayableListMap, params });

    const sourcePayableId = treatmentPayableItem?.payableId || claimPayableItem?.id;
    const payableId = sourcePayableId || uuidv4();

    const treatmentPayableId = treatmentPayableItem?.id || uuidv4();
    return {
      payableId,
      claimPayableItem: !sourcePayableId
        ? addClaimPayable({ id: payableId, claimNo, incidentId, claimPayableListMap, extra })
        : {},
      treatmentPayableItem: !treatmentPayableItem?.id
        ? addTreatmentPayable({
            claimNo,
            id: treatmentPayableId,
            payableId,
            incidentId,
            treatmentId,
            treatmentListMap,
            invoiceListMap,
            extra,
          })
        : {},
      accidentBenefitPayableItem: addAccidentBenefitPayable({
        claimNo,
        payableId,
        treatmentPayableId,
        incidentId,
        treatmentId,
        extra,
      }),
    };
  },

  // 获取新增C类型payable
  addCashlessPayable: (params: any) => {
    const { incidentId, treatmentId, claimEntities, claimProcessData, extra } = params;
    const { claimPayableListMap, treatmentListMap, invoiceListMap } = claimEntities;
    const { claimNo } = claimProcessData;

    const claimPayableItem: any = getFilterData({ filterName: claimPayableListMap, params });

    const payableId = claimPayableItem?.id || uuidv4();

    return {
      payableId,
      claimPayableItem: !claimPayableItem?.id
        ? addClaimPayable({ id: payableId, claimNo, incidentId, claimPayableListMap, extra })
        : claimPayableItem,
      treatmentPayableItem: addTreatmentPayable({
        claimNo,
        id: uuidv4(),
        payableId,
        incidentId,
        treatmentId,
        treatmentListMap,
        invoiceListMap,
        extra,
      }),
    };
  },
  // 获取新增R类型payable
  addReimbursementPayable: (params: any) => {
    const { payableAmount } = params.extra || {};
    const { incidentId, treatmentId, serviceItemId, claimEntities, claimProcessData } = params;
    const extra = {
      ...params.extra,
      payableAmount: payableAmount || 0,
      assessorOverrideAmount: payableAmount || 0,
    };

    const {
      claimPayableListMap,
      treatmentListMap,
      treatmentPayableListMap,
      invoicePayableListMap,
      invoiceListMap,
      serviceItemListMap,
    } = claimEntities;
    const { claimNo } = claimProcessData;

    const claimPayableItem: any = getFilterData({ filterName: claimPayableListMap, params });
    const treatmentPayableItem: any = getFilterData({
      filterName: treatmentPayableListMap,
      params,
      extraScreen: { treatmentId },
    });
    const invoicePayableItem: any = getFilterData({
      filterName: invoicePayableListMap,
      params,
      extraScreen: { treatmentId },
    });

    const sourcePayableId =
      invoicePayableItem?.payableId || treatmentPayableItem?.payableId || claimPayableItem?.id;
    const payableId = sourcePayableId || uuidv4();

    const sourceTreatmentPayableId =
      invoicePayableItem?.treatmentPayableId || treatmentPayableItem?.id;
    const treatmentPayableId = sourceTreatmentPayableId || uuidv4();

    const invoicePayableId = invoicePayableItem?.id || uuidv4();
    const invoiceId = serviceItemListMap?.[serviceItemId]?.invoiceId;

    return {
      payableId,
      claimPayableItem: !sourcePayableId
        ? addClaimPayable({ id: payableId, claimNo, incidentId, claimPayableListMap, extra })
        : {},
      treatmentPayableItem: !sourceTreatmentPayableId
        ? addTreatmentPayable({
            claimNo,
            id: treatmentPayableId,
            payableId,
            incidentId,
            treatmentId,
            treatmentListMap,
            invoiceListMap,
            extra,
          })
        : {},
      invoicePayableItem: !invoicePayableItem?.id
        ? addInvoicePayable({
            claimNo,
            id: invoicePayableId,
            incidentId,
            treatmentId,
            invoiceId,
            payableId,
            treatmentPayableId,
            expenseAmount: invoiceListMap[invoiceId]?.expense,
            extra: { ...extra },
          })
        : {},
      servicePayableItem: addServicePayable({
        claimNo,
        id: uuidv4(),
        incidentId,
        treatmentId,
        invoiceId,
        serviceItemId,
        payableId,
        treatmentPayableId,
        invoicePayableId,
        expense: serviceItemListMap[serviceItemId]?.expense,
        extra,
      }),
    };
  },

  // 获取新增S类型的payable
  addProcedurePayable: (params: any) => {
    const { incidentId, treatmentId, claimEntities, claimProcessData, extra } = params;
    const { claimPayableListMap, treatmentListMap, treatmentPayableListMap, invoiceListMap } =
      claimEntities;
    const { claimNo } = claimProcessData;

    const claimPayableItem: any = getFilterData({ filterName: claimPayableListMap, params });
    const treatmentPayableItem: any = getFilterData({
      filterName: treatmentPayableListMap,
      params,
      extraScreen: { treatmentId },
    });

    const sourcePayableId = treatmentPayableItem?.payableId || claimPayableItem?.id;
    const payableId = sourcePayableId || uuidv4();

    const sourceTreatmentPayableId = treatmentPayableItem?.id;
    const treatmentPayableId = sourceTreatmentPayableId || uuidv4();

    const procedurePayabId = uuidv4();
    return {
      payableId,
      claimPayableItem: !sourcePayableId
        ? addClaimPayable({ id: payableId, claimNo, incidentId, claimPayableListMap, extra })
        : {},
      treatmentPayableItem: !sourceTreatmentPayableId
        ? addTreatmentPayable({
            claimNo,
            id: treatmentPayableId,
            payableId,
            incidentId,
            treatmentId,
            treatmentListMap,
            invoiceListMap,
            extra,
          })
        : {},
      procedurePayabItem: addProcedurePayable({
        claimNo,
        id: procedurePayabId,
        incidentId,
        treatmentId,
        procedureId: extra.procedureId,
        payableId,
        treatmentPayableId,
        extra: { ...extra },
      }),
    };
  },

  // 获取新增CI类型的payable
  addOtherProcedurePayable: (params: any) => {
    const { incidentId, treatmentId, claimEntities, claimProcessData, extra } = params;
    const { claimPayableListMap, treatmentListMap, treatmentPayableListMap, invoiceListMap } =
      claimEntities;
    const { claimNo } = claimProcessData;
    const claimPayableItem: any = getFilterData({ filterName: claimPayableListMap, params });
    const treatmentPayableItem: any = getFilterData({
      filterName: treatmentPayableListMap,
      params,
      extraScreen: { treatmentId },
    });

    const sourcePayableId = treatmentPayableItem?.payableId || claimPayableItem?.id;
    const payableId = sourcePayableId || uuidv4();

    const sourceTreatmentPayableId = treatmentPayableItem?.id;
    const treatmentPayableId = sourceTreatmentPayableId || uuidv4();

    const otherProcedurePayabId = uuidv4();
    return {
      payableId,
      claimPayableItem: !sourcePayableId
        ? addClaimPayable({ id: payableId, claimNo, incidentId, claimPayableListMap, extra })
        : {},
      treatmentPayableItem: !sourceTreatmentPayableId
        ? addTreatmentPayable({
            claimNo,
            id: treatmentPayableId,
            payableId,
            incidentId,
            treatmentId,
            treatmentListMap,
            invoiceListMap,
            extra,
          })
        : {},
      otherProcedurePayableItem: addOtherProcedurePayable({
        claimNo,
        id: otherProcedurePayabId,
        incidentId,
        treatmentId,
        otherProcedureId: extra.otherProcedureId,
        payableId,
        treatmentPayableId,
        extra: { ...extra },
      }),
    };
  },
  // 获取新增L类型的payable
  addLife: (params: any) => {
    const { incidentId, claimEntities, claimProcessData, extra } = params;
    const { claimPayableListMap } = claimEntities;
    const { claimNo } = claimProcessData;

    const payableId = uuidv4();

    return {
      payableId,
      claimPayableItem: addClaimPayable({
        id: payableId,
        claimNo,
        incidentId,
        claimPayableListMap,
        extra,
      }),
      lifePayableItem: addLifePayable({
        claimNo,
        id: uuidv4(),
        incidentId,
        payableId,
        extra: { ...extra },
      }),
    };
  },

  // 更新A类型数据
  updateAipaPayableData: ({ draftState, updateFields, extra }: any) => {
    const { accidentBenefitPayableId, payableAmount, payableDays } =
      lodash.pick(extra, updateFields.concat(['accidentBenefitPayableId'])) || {};

    const updatePayableItem =
      draftState?.claimEntities.accidentBenefitPayableListMap?.[accidentBenefitPayableId];

    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.accidentBenefitPayableListMap[accidentBenefitPayableId] = {
      ...updatePayableItem,
      payableAmount,
      payableDays,
    };
    return {
      payableId: updatePayableItem.payableId,
    };
  },
  // 更新C类型数据
  updateCashlessPayableData: ({ draftState, updateFields, extra }: any) => {
    const { treatmentPayableId, payableAmount, payableDays } =
      lodash.pick(extra, updateFields.concat(['treatmentPayableId'])) || {};

    const updatePayableItem =
      draftState?.claimEntities.treatmentPayableListMap?.[treatmentPayableId];

    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.treatmentPayableListMap[treatmentPayableId] = {
      ...updatePayableItem,
      payableAmount,
      payableDays,
    };
    return {
      payableId: updatePayableItem.payableId,
    };
  },
  // 更新R类型数据
  updateReimbursementPayableData: ({ draftState, updateFields, extra }: any) => {
    const { servicePayableId, payableId, payableAmount, payableDays } =
      lodash.pick(extra, updateFields.concat(['servicePayableId'])) || {};

    const updatePayableItem =
      draftState?.claimEntities.serviceItemPayableListMap?.[servicePayableId];

    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.serviceItemPayableListMap[servicePayableId] = {
      ...updatePayableItem,
      payableAmount: payableAmount || 0,
      assessorOverrideAmount: payableAmount || 0,
      payableDays,
    };
    return {
      payableId,
    };
  },
  // 更新S类型数据
  updateProcedurePayableData: ({ draftState, updateFields, extra }: any) => {
    const { procedurePayableId, payableAmount } =
      lodash.pick(extra, updateFields.concat(['procedurePayableId'])) || {};

    const updatePayableItem =
      draftState?.claimEntities.procedurePayableListMap?.[procedurePayableId];

    draftState.claimEntities.procedurePayableListMap[procedurePayableId] = {
      ...updatePayableItem,
      payableAmount,
    };
    return {
      payableId: updatePayableItem.payableId,
    };
  },
  // 更新S类型数据
  updateOtherProcedurePayableData: ({ draftState, updateFields, extra }: any) => {
    const { otherProcedurePayableId, payableAmount, payableDays } =
      lodash.pick(extra, updateFields.concat(['otherProcedurePayableId'])) || {};

    const updatePayableItem =
      draftState?.claimEntities.otherProcedurePayableListMap?.[otherProcedurePayableId];

    draftState.claimEntities.otherProcedurePayableListMap[otherProcedurePayableId] = {
      ...updatePayableItem,
      payableAmount,
      payableDays,
    };
    return {
      payableId: updatePayableItem.payableId,
    };
  },

  // 修改数据(TODO:这里可以用map的方式去做)
  changeAddData({ draftState, addData }: any) {
    const {
      payableId,
      claimPayableItem,
      treatmentPayableItem,
      invoicePayableItem,
      procedurePayabItem,
      otherProcedurePayableItem,
      servicePayableItem,
      accidentBenefitPayableItem,
      lifePayableItem,
    } = addData;
    // 设置claimPayable数据
    if (claimPayableItem && !lodash.isEmpty(claimPayableItem)) {
      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.claimPayableListMap[payableId] = {
        ...addData.claimPayableItem,
        insuredId: draftState.claimProcessData?.insured?.insuredId,
      };
      // eslint-disable-next-line no-param-reassign
      draftState.claimProcessData.claimPayableList = lodash.uniq([
        ...draftState.claimProcessData.claimPayableList,
        payableId,
      ]);
    }

    // 设置treatmentPayable数据
    if (treatmentPayableItem && !lodash.isEmpty(treatmentPayableItem)) {
      const treatmentPayableList =
        draftState?.claimEntities?.claimPayableListMap?.[payableId]?.treatmentPayableList || [];
      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.claimPayableListMap[payableId] = {
        ...draftState?.claimEntities?.claimPayableListMap?.[payableId],
        treatmentPayableList: lodash.uniq([...treatmentPayableList, treatmentPayableItem?.id]),
      };

      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.treatmentPayableListMap[treatmentPayableItem?.id] = {
        ...treatmentPayableItem,
      };
    }
    // 设置procedurePayable数据
    if (procedurePayabItem && !lodash.isEmpty(procedurePayabItem)) {
      const procedurePayableList =
        draftState?.claimEntities?.treatmentPayableListMap?.[procedurePayabItem?.treatmentPayableId]
          ?.procedurePayableList || [];
      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.treatmentPayableListMap[procedurePayabItem?.treatmentPayableId] = {
        ...draftState?.claimEntities?.treatmentPayableListMap?.[
          procedurePayabItem?.treatmentPayableId
        ],
        procedurePayableList: lodash.uniq([...procedurePayableList, procedurePayabItem.id]),
      };

      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.procedurePayableListMap[procedurePayabItem.id] = {
        ...procedurePayabItem,
      };
    }
    // 设置otherProcedurePayable数据
    if (otherProcedurePayableItem && !lodash.isEmpty(otherProcedurePayableItem)) {
      const otherProcedurePayableList =
        draftState?.claimEntities?.treatmentPayableListMap?.[
          otherProcedurePayableItem?.treatmentPayableId
        ]?.otherProcedurePayableList || [];
      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.treatmentPayableListMap[
        otherProcedurePayableItem?.treatmentPayableId
      ] = {
        ...draftState?.claimEntities?.treatmentPayableListMap?.[
          otherProcedurePayableItem?.treatmentPayableId
        ],
        otherProcedurePayableList: lodash.uniq([
          ...otherProcedurePayableList,
          otherProcedurePayableItem.id,
        ]),
      };

      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.otherProcedurePayableListMap[otherProcedurePayableItem.id] = {
        ...otherProcedurePayableItem,
      };
    }
    // 设置invoicePayable数据
    if (invoicePayableItem && !lodash.isEmpty(invoicePayableItem)) {
      const invoicePayableList =
        draftState?.claimEntities?.treatmentPayableListMap?.[invoicePayableItem?.treatmentPayableId]
          ?.invoicePayableList || [];
      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.treatmentPayableListMap[invoicePayableItem?.treatmentPayableId] = {
        ...draftState?.claimEntities?.treatmentPayableListMap?.[
          invoicePayableItem?.treatmentPayableId
        ],
        invoicePayableList: lodash.uniq([...invoicePayableList, invoicePayableItem.id]),
      };

      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.invoicePayableListMap[invoicePayableItem.id] = {
        ...invoicePayableItem,
      };
    }
    // 设置servicePayable数据
    if (servicePayableItem && !lodash.isEmpty(servicePayableItem)) {
      const serviceItemPayableList =
        draftState?.claimEntities?.invoicePayableListMap?.[servicePayableItem?.invoicePayableId]
          ?.serviceItemPayableList || [];

      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.invoicePayableListMap[servicePayableItem?.invoicePayableId] = {
        ...draftState?.claimEntities?.invoicePayableListMap?.[servicePayableItem?.invoicePayableId],
        serviceItemPayableList: lodash.uniq([...serviceItemPayableList, servicePayableItem?.id]),
      };

      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.serviceItemPayableListMap[servicePayableItem?.id] = {
        ...servicePayableItem,
      };
    }
    // 设置accidentBenefitPayable数据
    if (accidentBenefitPayableItem && !lodash.isEmpty(accidentBenefitPayableItem)) {
      const accidentBenefitPayableList =
        draftState?.claimEntities?.treatmentPayableListMap?.[accidentBenefitPayableItem.id]
          ?.accidentBenefitPayableList || [];
      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.treatmentPayableListMap[accidentBenefitPayableItem.id] = {
        ...draftState?.claimEntities?.treatmentPayableListMap?.[accidentBenefitPayableItem.id],
        accidentBenefitPayableList: lodash.uniq([
          ...accidentBenefitPayableList,
          accidentBenefitPayableItem.id,
        ]),
      };

      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.accidentBenefitPayableListMap[accidentBenefitPayableItem.id] = {
        ...accidentBenefitPayableItem,
      };
    }

    // 设置lifePayable数据
    if (lifePayableItem && !lodash.isEmpty(lifePayableItem)) {
      draftState.claimEntities.claimPayableListMap[payableId] = {
        ...draftState.claimEntities.claimPayableListMap[payableId],
        lifePayable: lifePayableItem,
      };
    }
  },
};
