export enum EPaymentMethod {
  BankTransfer = '01', // BNK
  CounterDeposit = 'CNT',
  ByCheck = '02', // CHK
  PostBank = 'POST',
  PremiumAccount = 'PREM',

  FasterPayment = 'FPS',
  ElevenCash = '7-11',
  DirectCredit = 'DCA',
  SystemCheque = 'CHQS',
  SuppressCheque = 'CHQM',
  InstantCheque = 'CHQO',
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
  PostBank = EPaymentMethod.PostBank,
  PremiumAccount = EPaymentMethod.PremiumAccount,
}
