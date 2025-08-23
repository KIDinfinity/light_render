import InvoiceDate, { localFieldConfig as InvoiceDateConfig } from './InvoiceDate';
import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import InvoiceNo, { localFieldConfig as InvoiceNoConfig } from './InvoiceNo';
import OtherInsurerPaidAmount, {
  localFieldConfig as OtherInsurerPaidAmountConfig,
} from './OtherInsurerPaidAmount';
import ExchangeDate, { localFieldConfig as ExchangeDateConfig } from './ExchangeDate';
import IsClaimWithOtherInsurer, {
  localFieldConfig as IsClaimWithOtherInsurerConfig,
} from './IsClaimWithOtherInsurer';

export const localFieldConfigs = [
  InvoiceDateConfig,
  ExpenseConfig,
  InvoiceNoConfig,
  OtherInsurerPaidAmountConfig,
  ExchangeDateConfig,
  IsClaimWithOtherInsurerConfig,
];

export default {
  InvoiceDate,
  Expense,
  InvoiceNo,
  OtherInsurerPaidAmount,
  ExchangeDate,
  IsClaimWithOtherInsurer,
};
