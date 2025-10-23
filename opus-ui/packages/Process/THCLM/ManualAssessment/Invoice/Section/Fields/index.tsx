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
import SummaryOfServiceItem, {
  localFieldConfig as SummaryOfServiceItemConfig,
} from './SummaryOfServiceItem';

export const localFieldConfigs = [
  InvoiceDateConfig,
  ExpenseConfig,
  InvoiceNoConfig,
  OtherInsurerPaidAmountConfig,
  ExchangeDateConfig,
  IsClaimWithOtherInsurerConfig,
  SummaryOfServiceItemConfig,
];

export default {
  InvoiceDate,
  Expense,
  InvoiceNo,
  OtherInsurerPaidAmount,
  ExchangeDate,
  IsClaimWithOtherInsurer,
  SummaryOfServiceItem,
};
