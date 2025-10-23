import { chain, values } from 'lodash';
import type { IInvoice } from '@/dtos/claim/InvoiceModel';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

export default (invoiceListMap: any, treatmentId: string) => {
  return chain(values(invoiceListMap))
    .compact()
    .filter((invoice: IInvoice) => invoice.treatmentId === treatmentId)
    .reduce((sum, cur: IInvoice) => {
      const temp = add(sum, formUtils.queryValue(cur.expense));
      return temp === null ? 0 : temp;
    }, 0)
    .value();
};
