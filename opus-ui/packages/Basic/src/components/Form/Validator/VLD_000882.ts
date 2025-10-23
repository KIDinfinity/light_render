import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000882 = (isWOPClaimType: boolean, isZeroPayoutAmount: boolean) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (isWOPClaimType && isZeroPayoutAmount && value === 'Y') {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000903' }));
  }

  callback();
};
