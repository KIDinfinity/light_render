import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import { BenefitCategoryEnum, Payable } from 'process/Utils/Payable';
import { getMappingPolicyData } from '../functions/utils';

const saveTreatmentPayableAddItem = (state: any, action: any) => {
  const { treatmentPayableAddItem } = state;
  const { changedFields } = action.payload;
  let newTreatmentPayableAddItem: any = { ...treatmentPayableAddItem, ...changedFields };
  const treatmentPayableAddItemValue = formUtils.cleanValidateData(newTreatmentPayableAddItem);
  const nextState = produce(state, (draftState: any) => {
    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      const claimPayableListEntries = Object.entries(
        formUtils.cleanValidateData(draftState.claimEntities.claimPayableListMap)
      );
      const incidentPayableArray: any = [];
      if (lodash.has(changedFields, 'policyNo')) {
        lodash.map(claimPayableListEntries, (item: any) => {
          if (
            item[1].incidentId === treatmentPayableAddItemValue.incidentId &&
            item[1].policyNo === treatmentPayableAddItemValue.policyNo
          ) {
            incidentPayableArray.push(item[1]);
          }
        });
        // 如果当前的保单过滤后只有一条incidentPayable数据
        if (incidentPayableArray && incidentPayableArray.length === 1) {
          const incidentPayableItem = incidentPayableArray[0];
          newTreatmentPayableAddItem.productCode = {
            ...treatmentPayableAddItemValue.productCode,
            touched: true,
            name: 'productCode',
            value: incidentPayableItem.productCode,
            errors: undefined,
          };
          newTreatmentPayableAddItem.benefitTypeCode = {
            ...treatmentPayableAddItemValue.benefitTypeCode,
            touched: true,
            name: 'benefitTypeCode',
            value: incidentPayableItem.benefitTypeCode,
            errors: undefined,
          };
        } else {
          newTreatmentPayableAddItem.productCode = null;
          newTreatmentPayableAddItem.benefitTypeCode = null;
          newTreatmentPayableAddItem.benefitItemCode = null;
        }
      }

      if (lodash.has(changedFields, 'benefitTypeCode')) {
        newTreatmentPayableAddItem = {
          ...newTreatmentPayableAddItem,
          ...(getMappingPolicyData({
            item: newTreatmentPayableAddItem,
            listPolicy: draftState.listPolicy,
          }) || {}),
        };
      }
      // 新增payable
      if (lodash.has(changedFields, 'benefitItemCode')) {
        const cleaAddItem = formUtils.cleanValidateData(newTreatmentPayableAddItem);
        const policyList =
          lodash.filter(
            draftState.listPolicy,
            lodash.pick(cleaAddItem, ['benefitTypeCode', 'benefitItemCode', 'policyNo'])
          ) || [];

        if (
          !lodash.isEmpty(policyList) &&
          policyList?.[0]?.benefitCategory === BenefitCategoryEnum.Cashless
        ) {
          const addBaseData = Payable.addCashlessPayable({
            ...lodash.pick(cleaAddItem, ['treatmentId', 'incidentId']),
            extra: {
              ...cleaAddItem,
              benefitAmount: policyList?.[0]?.benefitAmount || policyList?.[0]?.sumAssured,
              benefitCategory: 'C',
            },
            ...formUtils.cleanValidateData({
              ...lodash.pick(draftState, ['claimEntities', 'claimProcessData']),
            }),
          });
          Payable.changeAddData({ draftState, addData: addBaseData });
          newTreatmentPayableAddItem = {};
        }
      }
    }
    draftState.treatmentPayableAddItem = newTreatmentPayableAddItem;
  });

  return { ...nextState };
};

export default saveTreatmentPayableAddItem;
