import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { TREATMENTITEM } from '@/utils/claimConstant';
import {
  removeEmptyInvoiceList,
  buildInvoiceItemList,
  buildTreatment,
} from '../functions/handlePopUp';

export default (state: any, action: any) => {
  const { incidentId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const treatmentListMap = draftState.claimEntities?.treatmentListMap;
    const claimNo = draftState.claimProcessData?.claimNo;
    const curTreatmentList = lodash.filter(
      treatmentListMap,
      (treatment) => treatment.incidentId === incidentId
    );
    const popUpInvoiceList = formUtils.cleanValidateData(draftState?.popUpInvoiceList);

    const invoiceItemList = lodash.map(popUpInvoiceList, (invoice) => {
      return {
        ...invoice,
        treatmentNo: invoice?.treatmentNo ? lodash.toNumber(invoice?.treatmentNo) : 1,
      };
    });
    const groupInvoiceList = lodash.groupBy(invoiceItemList, 'treatmentNo');

    const curTreatmentNoList = lodash.map(curTreatmentList, (treatment) =>
      lodash.toNumber(treatment.treatmentNo)
    );
    const curInvoiceTreatmentNoList = lodash.map(invoiceItemList, (invoice) =>
      lodash.toNumber(invoice.treatmentNo)
    );

    // 找到不包含在invoiceNoList 里的treatmentNo  ex: treatmentNolist:[1,3,4] invoiceNoList:[2,4] => [1,3]  delete [1,3]的treatment的 invoiceList
    removeEmptyInvoiceList({ curTreatmentNoList, curInvoiceTreatmentNoList, draftState });

    lodash.forEach(groupInvoiceList, (invoiceList: any, treatmentNo: string) => {
      const invoiceIdList = lodash.map(invoiceList, (item: any) => item?.id);

      if (lodash.includes(curTreatmentNoList, lodash.toNumber(treatmentNo))) {
        lodash.forEach(curTreatmentList, (treatment: any) => {
          // 匹配treatmentNo  成功： update invoiceList
          if (lodash.toNumber(treatment.treatmentNo) === lodash.toNumber(treatmentNo)) {
            draftState.claimEntities.treatmentListMap[treatment.id].invoiceList = invoiceIdList;
            buildInvoiceItemList({ invoiceList, draftState, treatmentId: treatment.id });
          }
        });
      }
      // 如果当前的invoice treatmentNo都不包含在 curTreatmentNoList, 则该incident 不存在 treatment 需要新增treatment
      else {
        const addTreatmentItem = {
          ...TREATMENTITEM,
          claimNo,
          id: uuidv4(),
          incidentId,
          invoiceList: invoiceIdList,
          treatmentNo: lodash.toNumber(invoiceList[0]?.treatmentNo),
        };
        buildTreatment({ addTreatmentItem, draftState, incidentId });
        buildInvoiceItemList({ invoiceList, draftState, treatmentId: addTreatmentItem.id });
      }
    });
  });
  return { ...nextState };
};
