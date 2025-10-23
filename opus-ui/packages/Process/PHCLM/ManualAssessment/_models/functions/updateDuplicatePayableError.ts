import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

const map = {
  claimPayable: {
    id: 'incidentId',
    listMap: 'claimPayableListMap',
    field: 'benefitTypeCode',
  },
  treatmentPayable: {
    id: 'treatmentId',
    listMap: 'treatmentPayableListMap',
    field: 'benefitItemCode',
  },
  servicePayable: {
    id: 'serviceItemId',
    listMap: 'serviceItemPayableListMap',
    field: 'benefitItemCode',
  },
  procedurePayable: {
    id: 'procedureId',
    listMap: 'procedurePayableListMap',
    field: 'benefitItemCode',
  },
  otherProcedurePayable: {
    id: 'otherProcedureId',
    listMap: 'otherProcedurePayableListMap',
    field: 'benefitItemCode',
  },
};

export const updateDuplicatePayableError = (
  draftState: any,
  params: any,
  mapStr: string
) => {
  const mapItem = map[mapStr];
  const { editPayable, benefitItemCode } = lodash.pick(params, ['editPayable', 'benefitItemCode']);
  const payableList = formUtils.cleanValidateData(draftState.claimEntities[mapItem.listMap]);
  const duplicatePayableList = lodash.filter(payableList, (payableItem: any) =>
    payableItem[mapItem.id] === editPayable[mapItem.id] && benefitItemCode
      ? filterDuplicatePayable(payableItem, editPayable, benefitItemCode)
      : filterDuplicatePayable(payableItem, editPayable)
  );

  if (lodash.size(duplicatePayableList)) {
    lodash.forEach(duplicatePayableList, (item) => {
      if (lodash.isObject(draftState.claimEntities[mapItem.listMap][item.id][mapItem.field])) {
        draftState.claimEntities[mapItem.listMap][item.id][mapItem.field].errors = null;
      }
    });
  }
};

export default updateDuplicatePayableError;
