import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';

export const VLD000230Block = (invoiceItem: any, payableAmount: number) => {
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

export const targetAccumulatorValue = ({ shareItems, payableDaysList }: any): number =>
  lodash.reduce(
    shareItems,
    (result: number, item: any): number => {
      const target = lodash.filter(
        payableDaysList,
        (paydaysItem: any) => formUtils.queryValue(paydaysItem?.benefitItemCode) === item
      );
      const payDaysTemp: number = lodash.reduce(
        target,
        (payDaysResult, paydaysItem) =>
          add(payDaysResult, formUtils.queryValue(paydaysItem?.payableDays)),
        0
      );
      return add(result, payDaysTemp);
    },
    0
  );

export const isSkipCalculate = (listPolicy: any[], value: string) => {
  const target = lodash.find(listPolicy, { benefitItemCode: value });
  const skipCalculate = lodash.get(target, 'accidentBenefit.skipCalculate');
  if (skipCalculate === 'Y') return true;
  return false;
};

export const validateFieldRequire = (fieldName: any) => {
  const finalFieldValue = {
    value: null,
    errors: [
      {
        field: fieldName,
        message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
      },
    ],
    validating: false,
    dirty: false,
    touched: true,
    name: fieldName,
  };
  return finalFieldValue;
};
