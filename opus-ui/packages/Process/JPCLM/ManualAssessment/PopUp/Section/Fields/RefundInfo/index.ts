import PayoutAmount, { localFieldConfig as PayoutAmountLocalFieldConfig } from './PayoutAmount';
import EntryAmount, { localFieldConfig as EntryAmountLocalFieldConfig } from './EntryAmount';
import InterestAmount, {
  localFieldConfig as InterestAmountLocalFieldConfig,
} from './InterestAmount';
import MaterialFee, { localFieldConfig as MaterialFeeLocalFieldConfig } from './MaterialFee';
import PrePaidPremium, {
  localFieldConfig as PrePaidPremiumLocalFieldConfig,
} from './PrePaidPremium';
import UnpaidPremium, { localFieldConfig as UnpaidPremiumLocalFieldConfig } from './UnpaidPremium';

export const localFieldConfigs = [
  PayoutAmountLocalFieldConfig,
  EntryAmountLocalFieldConfig,
  InterestAmountLocalFieldConfig,
  MaterialFeeLocalFieldConfig,
  PrePaidPremiumLocalFieldConfig,
  UnpaidPremiumLocalFieldConfig,
];

export default {
  PayoutAmount,
  EntryAmount,
  InterestAmount,
  MaterialFee,
  PrePaidPremium,
  UnpaidPremium,
};
