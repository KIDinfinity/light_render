// 被保人基本信息 数据模型
export interface IInsured {
  policyNo: string;
  address: string; // "兵庫県神戸市中区4丁目"
  claimNo: string; // "201909260017"
  creator: string; // "Jane"
  currentState: string | null; // null
  dateOfBirth: Date; // "1954-12-31T16:00:00.000+0000"
  dateTimeOfDeath: Date; // null
  deleted: number; // 0
  email: string; // ""
  firstName: string; // "富士デモ一"
  gender: string; // "M"
  gmtCreate: Date; // "2019-09-26T02:48:04.000+0000"
  gmtModified: Date; // "2019-09-26T02:48:04.000+0000"
  id: string; // "ce3240f3-dbd4-4c5e-92fc-6dee610ea1f5"
  identityNo: string; // "J******1"
  identityType: string; // "I"
  insuredId: string | null; // null
  middleName: string | null; // null
  modifier: Date; // null
  nationality: string; // "JPN"
  occupation: string; // "002"
  phoneNo: string; // "(090)1111-1111"
  postCode: string | null; // null
  surname: string; // "Sirrs"
  transId: string; // "14043d82-b9fd-442a-8ffa-75f7145185c9"
  enableReload?: 'Y' | 'N'; // true
}
