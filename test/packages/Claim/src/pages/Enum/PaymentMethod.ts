enum PaymentMethod {
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
  ByCheckInPayee = 'CHK',
  bankCount = 'BTR', //BTR
}
export default PaymentMethod;
