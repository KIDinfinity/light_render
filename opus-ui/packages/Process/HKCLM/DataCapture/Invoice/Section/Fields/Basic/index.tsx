import ExchangeDate, { localFieldConfig as ExchangeDateConfig } from './ExchangeDate';
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
  ExchangeDateConfig,
  ExpenseConfig,
  InvoiceDateConfig,
  InvoiceNoConfig,
  IsClaimWithOtherInsurerConfig,
  OtherInsurerPaidAmountConfig,
];

export default {
  ExchangeDate,
  Expense,
  InvoiceDate,
  InvoiceNo,
  IsClaimWithOtherInsurer,
  OtherInsurerPaidAmount,
};
