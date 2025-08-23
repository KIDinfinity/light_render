// 领款人 数据模型
export interface IPayee {
  account: string;
  address: string;
  bankAccountName: string;
  bankAccountNo: string;
  bankCode: string;
  branchCode: string;
  branchName: string;
  claimNo: string;
  creator: string;
  deleted: number;
  email: string;
  firstName: string;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  identityNo: string;
  identityType: string;
  modifier: string;
  organization: number;
  passbookCode: string;
  passbookNo: string;
  payeeNo: string;
  payeeType: string;
  paymentAmount: number;
  paymentMethod: string;
  phoneNo: string;
  postCode: string;
  relationshipWithInsured: string;
  scheduledDate: Date;
  surname: string;
  transId: string;
  transferAccount: string;
  typeOfPayment: string;
}
