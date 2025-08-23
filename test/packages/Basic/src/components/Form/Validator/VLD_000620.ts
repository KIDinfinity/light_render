import { formatMessageApi } from '@/utils/dictFormatMessage';

// eslint-disable-next-line no-shadow
enum Decision {
  A = 'A',
  D = 'D',
  TBC = 'TBC',
}

// eslint-disable-next-line no-shadow
enum Enable {
  Yes = 'Y',
  No = 'N',
}

const map = {
  A: '01',
  H: '02',
  Q: '04',
  M: '12',
};

export const VLD_000620 =
  (decision: string, policyPmMode: object, runPaymentModeRule: boolean) =>
  (rule: any, value: any, callback: Function) => {
    if (!runPaymentModeRule) {
      callback();
      return;
    }
    if (decision !== Decision.D && policyPmMode?.[map[value]]?.enableChange !== Enable.Yes) {
      callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000542' }));
      return;
    }
    callback();
  };
