import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param target 服务项费用总额
 */
export const VLD_000015 = (_this: any) => (rule: any, value: any, callback: Function) => {
  const { totalExpense } = _this.props;
  if (value !== totalExpense) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000029' }));
  }
  callback();
};
