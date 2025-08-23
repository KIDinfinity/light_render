import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export function deleteInvoicePayable(claimEntities: any) {
  const tempClaimEntities = lodash.cloneDeep(claimEntities);
  if (tempClaimEntities) {
    let del_invoice_payable_ids: string[] = [];
    let del_treatment_payable_ids: string[] = [];
    const invoicePayableMap = tempClaimEntities.invoicePayableListMap;
    const invoicePayableEntries: any[] = formUtils.cleanValidateData(
      lodash.entries(invoicePayableMap)
    );
    const treatmentPayableMap = tempClaimEntities.treatmentPayableListMap;
    const treatmentPayableEntries: any[] = formUtils.cleanValidateData(
      lodash.entries(treatmentPayableMap)
    );
    // 找到所有需要删除invoice payable数据
    lodash.forEach(invoicePayableEntries, (item: any) => {
      if (item[1]?.is_delete) {
        del_treatment_payable_ids.push(item[1]?.treatmentPayableId);
        del_invoice_payable_ids.push(item[0]);
        delete tempClaimEntities.invoicePayableListMap[item[0]];
      }
    });
    // 去除无效的id数据
    del_treatment_payable_ids = lodash.compact(del_treatment_payable_ids);
    del_invoice_payable_ids = lodash.compact(del_invoice_payable_ids);
    // 更新treatment Payable 的 invoicePayableList数据
    if (del_treatment_payable_ids.length > 0) {
      lodash.forEach(treatmentPayableEntries, (item: any) => {
        if (del_treatment_payable_ids.includes(item[0])) {
          treatmentPayableMap[item[0]].invoicePayableList = lodash.without(
            lodash.cloneDeep(treatmentPayableMap[item[0]]?.invoicePayableList),
            ...del_invoice_payable_ids
          );
        }
      });
    }
  }
  return tempClaimEntities;
}

export default function updateClaimEntities(claimEntities: any) {
  return deleteInvoicePayable(claimEntities);
}
