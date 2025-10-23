import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';

const filterInvoiceList = (invoiceList: any, targetDate: any) => {
  const newInvoiceList = lodash.filter(invoiceList, (item) => {
    if (targetDate) {
      return moment(formUtils.queryValue(item.invoiceDate)).isSame(
        moment(formUtils.queryValue(targetDate))
      );
    }

    return true;
  });
  return newInvoiceList;
};
const getInvoiceNo = (invoiceNumber: any, invoiceDate: any) => {
  const mapInvoiceNumber = invoiceNumber < 10 ? `0${invoiceNumber}` : invoiceNumber;
  const invoiceNo = `${moment(invoiceDate).format('YYYYMMDD')}${mapInvoiceNumber}`;
  return invoiceNo;
};

export { getInvoiceNo, filterInvoiceList };
