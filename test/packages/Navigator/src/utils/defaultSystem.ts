import { toUpper } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (text) =>
  toUpper(text) === 'SYSTEM' || !text
    ? formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.caseDetail.system',
      }) || '---'
    : text;
