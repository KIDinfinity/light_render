## POS Process


### Section 
 


* BasicInfo
  * PosRequest
  * PolicyOwner
  * Insured
* ChangeInfo
  * ContactInformation  **TransactionTypeCode.ChangeAddressContactInfo**
  * MailingAddress **TransactionTypeCode.ChangeAddressContactInfo**
  * ApplyToPoliciesList **policies && policies.length && TransactionTypeCode.ChangeAddressContactInfo**
* PartialWithdrawal
  * ContactAddress **TransactionTypeCode.PartialWithDrawal || TransactionTypeCode.Refund**
  * Refund **TransactionTypeCode.Refund**
  * PartialWithDrawal **TransactionTypeCode.PartialWithDrawal**
  * PayOutOption **(TransactionTypeCode.PartialWithDrawal && fundList?.length > 0) || (TransactionTypeCode.Refund && suspenseAmount > 0)**
* IssuanceDuplicatePolicy **TransactionTypeCode.IssuanceDuplicatePolicy**
* UnderWriter **![TaskDefKey.PH_POS_ACT001].includes(taskDefKey) && needUw**
* ApprovalDecision **[TaskDefKey.PH_POS_ACT003,TaskDefKey.PH_POS_ACT004].includes(taskDefKey)**
* LAPaymentTrack
  * InforcePosDecision **[TaskDefKey.PH_POS_ACT005,TaskDefKey.PH_POS_ACT006,TaskDefKey.PH_POS_ACT010].includes(taskDefKey)**
  * LATrack **[TaskDefKey.PH_POS_ACT006,TaskDefKey.PH_POS_ACT010].includes(taskDefKey)**
  * PaymentTrack **[TaskDefKey.PH_POS_ACT006,TaskDefKey.PH_POS_ACT010].includes(taskDefKey) && transaction === Payment.Out**
* MailsCertificatesCorrespondences **TransactionTypeCode.MailsCertificatesCorrespondences**
* Declarations
