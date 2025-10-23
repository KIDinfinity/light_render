import { PHONETYPE } from './PHONETYPE';

class PhoneNoUtils {
  PhoneNoInsertFormat = {
    uselessRegex: /[^0-9]/gi,
    specialPhoneNoLength: 12,
    start: {
      [PHONETYPE.Default]: 3,
      [PHONETYPE.Special]: 4,
    },
    step: 4,
    character: '-',
  };

  // 是否为特殊 phone number
  isSpecialPhoneNo = (PhoneNo: string | string[]) =>
    PhoneNo.length === this.PhoneNoInsertFormat.specialPhoneNoLength;

  // 去除 phone number 中的干扰字符
  trimPhoneNo = (PhoneNo: string) =>
    PhoneNo ? `${PhoneNo}`.trim().replace(this.PhoneNoInsertFormat.uselessRegex, '') : '';

  // 格式化 phone number
  formatPhoneNo = (PhoneNo: string) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const phoneNo: string[] = [...trimPhoneNo(PhoneNo)];
    const insertStart = this.PhoneNoInsertFormat.start[
      this.isSpecialPhoneNo(phoneNo) ? PHONETYPE.Special : PHONETYPE.Default
    ];
    const phoneNoArray = phoneNo.reduce(
      (accNumber: any, number: string, index: number) => {
        const accNumberLength = accNumber.length;
        const offset = index - insertStart;
        if (offset < 0) {
          // eslint-disable-next-line no-param-reassign
          accNumber[0] = accNumber[0] || [];
          accNumber[0].push(number);
        } else if (offset % this.PhoneNoInsertFormat.step === 0) {
          // eslint-disable-next-line no-param-reassign
          accNumber[accNumberLength] = [this.PhoneNoInsertFormat.character, number];
        } else {
          accNumber[accNumberLength - 1].push(number);
        }
        return accNumber;
      },
      []
    );

    return phoneNoArray.reduce(
      (accPhoneNo: string, subPhoneNo: string[]) => accPhoneNo + subPhoneNo.join(''),
      ''
    );
  };
}

export const { isSpecialPhoneNo, trimPhoneNo, formatPhoneNo } = new PhoneNoUtils();
