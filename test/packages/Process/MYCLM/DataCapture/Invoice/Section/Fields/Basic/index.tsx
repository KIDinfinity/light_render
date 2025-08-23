import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import InvoiceDate, { localFieldConfig as InvoiceDateConfig } from './InvoiceDate';
import InvoiceNo, { localFieldConfig as InvoiceNoConfig } from './InvoiceNo';
import IsClaimWithOtherInsurer, {
  localFieldConfig as IsClaimWithOtherInsurerConfig,
} from './IsClaimWithOtherInsurer';
import OtherInsurerPaidAmount, {
  localFieldConfig as OtherInsurerPaidAmountConfig,
} from './OtherInsurerPaidAmount';

export const localFieldConfigs = [
  ExpenseConfig,
  InvoiceDateConfig,
  InvoiceNoConfig,
  IsClaimWithOtherInsurerConfig,
  OtherInsurerPaidAmountConfig,
];

export default {
  Expense,
  InvoiceDate,
  InvoiceNo,
  IsClaimWithOtherInsurer,
  OtherInsurerPaidAmount,
};
