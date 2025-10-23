export enum EPaymentMethod {
  BankTransfer = '01', // BNK
  // 新加一个一样的是因为01/05的处理方式是一样的
  BankTransfer05 = '05', // BNK
  ByCheck = '02', // CHK
  PromptPay = '03',
  Draft = '04',
  Other = 'T',
  CounterDeposit = 'CNT',
  PostBank = 'POST',
  PremiumAccount = 'PREM',

  FasterPayment = 'FPS',
  ElevenCash = '7-11',
  DirectCredit = 'DCA',
  SystemCheque = 'CHQS',
  SuppressCheque = 'CHQM',
  InstantCheque = 'CHQO',
  ByCheckInPayee = 'CHK',
  BankTransfterInPayee = 'BTR'
}

export enum BankType {
  Bank = 'BANK',
  PostalBank = 'POST',
}

// cheque remark 非必要的payment method
export enum ERequireChequeRemark {
  SystemCheque = EPaymentMethod.SystemCheque,
  SuppressCheque = EPaymentMethod.SuppressCheque,
  InstantCheque = EPaymentMethod.InstantCheque,
}

// 带银行账户信息的payment method
export enum EHasBankAccount {
  DirectCredit = EPaymentMethod.DirectCredit,
  BankTransfer = EPaymentMethod.BankTransfer,
  BankTransfterInPayee = EPaymentMethod.BankTransfterInPayee,
  BankTransfer05 = EPaymentMethod.BankTransfer05,
  PostBank = EPaymentMethod.PostBank,
  PremiumAccount = EPaymentMethod.PremiumAccount,
  Other = EPaymentMethod.Other,
}
