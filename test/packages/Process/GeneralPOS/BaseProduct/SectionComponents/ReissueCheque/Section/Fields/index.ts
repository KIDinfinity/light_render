import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import ChequeTypeCode, { localFieldConfig as ChequeTypeCodeConfig } from './ChequeTypeCode';
import ChequeCancelReasonCode, {
  localFieldConfig as ChequeCancelReasonCodeConfig,
} from './ChequeCancelReasonCode';

export const localFieldConfigs = [
  PayableAmountConfig,
  ChequeTypeCodeConfig,
  ChequeCancelReasonCodeConfig,
];

export default {
  PayableAmount,
  ChequeTypeCode,
  ChequeCancelReasonCode,
};
