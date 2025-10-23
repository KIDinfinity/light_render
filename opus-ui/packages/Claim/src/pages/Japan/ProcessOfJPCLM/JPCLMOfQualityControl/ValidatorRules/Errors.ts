import { formatMessageApi } from '@/utils/dictFormatMessage';

enum Errors {
  // 必填
  ERR_000001 = 'ERR_000001',
  // 退院日は入院日当日、あるいは入院日より遅いこと。
  ERR_000035 = 'ERR_000035',
  // 治療終了日は開始日より早いものではない。
  ERR_000110 = 'ERR_000110',
  ERR_000240 = 'ERR_000240',
  ERR_000248 = 'ERR_000248',
}

export default Errors;

export const format = (message: string, dic?: string) =>
  formatMessageApi({ Label_COM_WarningMessage: message }, dic);
