import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_000230Block = (invoiceItem: any, payableAmount: number) => {
  const expenseErrors = lodash.get(invoiceItem, 'expense.errors', []);
  const tempInvoiceItem = invoiceItem;
  const ExpenseMessage = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000216' });
  const expense = {
    value: formUtils.queryValue(invoiceItem.expense),
    name: 'expense',
    touched: true,
    dirty: false,
    errors: undefined,
    validating: false,
  };
  if (payableAmount > (formUtils.queryValue(invoiceItem.expense) || 0)) {
    const errors = lodash.uniqWith(
      [
        ...expenseErrors,
        {
          message: ExpenseMessage,
          field: 'expense',
        },
      ],
      lodash.isEqual
    );
    tempInvoiceItem.expense = {
      ...expense,
      errors,
    };
  } else {
    const errors = lodash.filter(
      expenseErrors,
      (i) =>
        !lodash.isEqual(i, {
          message: ExpenseMessage,
          field: 'expense',
        })
    );
    tempInvoiceItem.expense = {
      ...expense,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
};
