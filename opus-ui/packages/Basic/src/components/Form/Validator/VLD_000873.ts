import { formatMessageApi } from '@/utils/dictFormatMessage';
// 判断是否超过四位小数
export const VLD_000873 = (switchInPerc,fundCode, allFundConfigList) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    value !== 'Y' &&
    Number(switchInPerc || 0) > 0 &&
    allFundConfigList?.find((item) => item?.fundCode === fundCode)?.fundType === 'foreign'
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000890' }));
  }
  callback();
};
