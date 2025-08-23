import { isEmpty } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

enum EHOSPITALTYPE {
  GOHOS = 'Request for Information from Government Hospital',
  PRIVATEHOS = 'Request for Information from Private Hospital',
}

const checkHospRecipientCode = (errObj: any, reason: any, isSend: boolean) => {
  const { reasonName, hospRecipientCode } = reason || {};

  if ((reasonName === EHOSPITALTYPE.GOHOS || reasonName === EHOSPITALTYPE.PRIVATEHOS) && isSend) {
    if (isEmpty(hospRecipientCode)) {
      errObj.hospRecipientCode = [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];
    }
  }
  return errObj;
};

export default checkHospRecipientCode;
