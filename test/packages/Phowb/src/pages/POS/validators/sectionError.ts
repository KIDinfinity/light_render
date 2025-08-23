import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import { TransactionTypeCode, PosDecesionType } from '../Enum';
import { VLD_000006, VLD_000289 } from './errorWarn';

export default ({ claimProcessData, taskDefKey }: any) => {
  let errors: any[] = [];
  const transactionType = formUtils.queryValue(
    claimProcessData?.posDataDetail?.posRequestInformation?.transactionType
  );

  // PartialWithdrawal
  const isPartialWithdrawal = transactionType === TransactionTypeCode.PartialWithDrawal;
  const fundList = claimProcessData?.posDataDetail.partialWithdrawal?.fundList;
  const totalWithdrawAmount =
    claimProcessData?.posDataDetail?.partialWithdrawal?.totalWithdrawAmount;
  const totalAmount = claimProcessData?.posDataDetail?.partialWithdrawal?.totalAmount;
  const totalPercentage = claimProcessData?.posDataDetail?.partialWithdrawal?.totalPercentage;
  if (isPartialWithdrawal && fundList?.length && lodash.isArray(fundList)) {
    errors = [...errors, ...VLD_000006(totalWithdrawAmount,totalAmount,totalPercentage)];
  }

  // usTaxDeclarations
  const usTaxDeclarations = claimProcessData?.posDataDetail?.usTaxDeclarations;
  if (usTaxDeclarations) {
    errors = [...errors, ...VLD_000289(usTaxDeclarations)];
  }

  // laUpdateTrack
  const laUpdateTrack = claimProcessData?.posDataDetail?.laUpdateTrack;
  const requestForIssuanceOfDuplicatePolicy =
    claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy;
  const regenerateContractCheck =
    taskDefKey === TaskDefKey.PH_POS_ACT006 &&
    transactionType === TransactionTypeCode.IssuanceDuplicatePolicy &&
    !Boolean(formUtils.queryValue(requestForIssuanceOfDuplicatePolicy.regenerateContract));
  const isAtLeastOneField =
    !formUtils.queryValue(laUpdateTrack?.lifeAsiaUpdateCompletedDate) &&
    !formUtils.queryValue(laUpdateTrack?.unCompleteReason);
  const isInforceDeclined =
    formUtils.queryValue(claimProcessData?.posDataDetail?.inforcePosDecision?.posDecision) ===
    PosDecesionType.Declined;

  if (
    [TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(taskDefKey) &&
    isAtLeastOneField &&
    !isInforceDeclined &&
    transactionType !== TransactionTypeCode.MailsCertificatesCorrespondences &&
    !regenerateContractCheck
  ) {
    errors = [...errors, { message: '' }];
  }

  return errors;
};
