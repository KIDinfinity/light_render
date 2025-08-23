import { formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import { TransactionTypeCode, PosDecesionType } from '../Enum';
import { VLD_000289 } from './errorWarn';

export default ({ claimProcessData, taskDefKey }: any) => {
  let errors: any[] = [];
  const transactionType = formUtils.queryValue(
    claimProcessData?.businessData?.posRequestInformation?.transactionType
  );

  // usTaxDeclarations
  const usTaxInformation = claimProcessData?.businessData?.transactionTypes?.[0]?.usTaxInformation;
  if (usTaxInformation) {
    errors = [...errors, ...VLD_000289(usTaxInformation)];
  }

  // laUpdateTrack
  const updateTrack = claimProcessData?.businessData?.transactionTypes?.[0]?.updateTrack;
  const requestForIssuanceOfDuplicatePolicy =
    claimProcessData?.businessData?.requestForIssuanceOfDuplicatePolicy;
  const regenerateContractCheck =
    taskDefKey === TaskDefKey.PH_POS_ACT006 &&
    transactionType === TransactionTypeCode.IssuanceDuplicatePolicy &&
    !Boolean(formUtils.queryValue(requestForIssuanceOfDuplicatePolicy.regenerateContract));
  const isAtLeastOneField =
    !formUtils.queryValue(updateTrack?.completedDate) &&
    !formUtils.queryValue(updateTrack?.uncompletedReason);
  const isInforceDeclined =
    formUtils.queryValue(claimProcessData?.businessData?.transactionTypes?.[0].decision) ===
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
