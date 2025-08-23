import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
const setInitData = (value: any, initValue: any) => (!lodash.isNil(value) ? value : initValue);

const saveClaimProcessData = (state: any, action: any) => {
  const { claimProcessData, init = false, taskDefKey, snapshotData = false } = action.payload;
  const partialWithdrawal = claimProcessData?.posDataDetail?.partialWithdrawal
    ? {
        partialWithdrawal: {
          ...claimProcessData?.posDataDetail?.partialWithdrawal,
          fundList: lodash.map(
            claimProcessData?.posDataDetail?.partialWithdrawal?.fundList,
            (item: any) => {
              return {
                ...item,
                withdrawPercentage: setInitData(item?.withdrawPercentage, 0),
                withdrawNumberOfUnits: setInitData(item?.withdrawNumberOfUnits, 0),
                withdrawAmount: setInitData(item?.withdrawAmount, 0),
                calculationAmount: setInitData(item?.calculationAmount, 0),
              };
            }
          ),
          totalWithdrawAmount: setInitData(
            claimProcessData?.posDataDetail?.partialWithdrawal?.totalWithdrawAmount,
            0
          ),
        },
      }
    : {};

  const payOutOption = claimProcessData?.posDataDetail?.payOutOption
    ? {
        ...claimProcessData?.posDataDetail?.payOutOption,
        newAccount: {
          ...claimProcessData?.posDataDetail?.payOutOption.newAccount,
          check: setInitData(
            claimProcessData?.posDataDetail?.payOutOption?.newAccount?.check,
            true
          ),
          payOutOption: setInitData(
            claimProcessData?.posDataDetail?.payOutOption?.newAccount?.payOutOption,
            '02'
          ),
          bankCode: setInitData(
            claimProcessData?.posDataDetail?.payOutOption?.newAccount?.bankCode,
            ''
          ),
          typeOfAccount: setInitData(
            claimProcessData?.posDataDetail?.payOutOption?.newAccount?.typeOfAccount,
            '01'
          ),
          currency: setInitData(
            claimProcessData?.posDataDetail?.payOutOption?.newAccount?.currency,
            'PHP'
          ),
        },
      }
    : {};

  const requestOfMailsCertificatesCorrespondences = claimProcessData?.posDataDetail
    ?.requestOfMailsCertificatesCorrespondences
    ? {
        ...claimProcessData?.posDataDetail?.requestOfMailsCertificatesCorrespondences,
        mailType: setInitData(
          claimProcessData?.posDataDetail?.requestOfMailsCertificatesCorrespondences?.mailType,
          ''
        ),
        sendTo: setInitData(
          claimProcessData?.posDataDetail?.requestOfMailsCertificatesCorrespondences?.sendTo,
          'P'
        ),
      }
    : {};

  const timeOfReplacement =
    claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy?.timeOfReplacement;
  const requestForIssuanceOfDuplicatePolicy =
    // eslint-disable-next-line no-nested-ternary
    claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy
      ? Number(timeOfReplacement) === 0 || lodash.isUndefined(timeOfReplacement)
        ? {
            ...claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy,
            timeDisEnbled: setInitData(
              claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy?.timeDisEnbled,
              false
            ),
            timeOfReplacement: setInitData(
              claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy
                ?.timeOfReplacement,
              ''
            ),
            chargeFee: setInitData(
              claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy?.chargeFee,
              0
            ),
            requestType: setInitData(
              claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy?.requestType,
              'OriginalPolicy'
            ),
            sendTo: setInitData(
              claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy?.sendTo,
              'P'
            ),
          }
        : {
            ...claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy,
            timeDisEnbled: setInitData(
              claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy?.timeDisEnbled,
              true
            ),
            requestType: setInitData(
              claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy?.requestType,
              'OriginalPolicy'
            ),
            sendTo: setInitData(
              claimProcessData?.posDataDetail?.requestForIssuanceOfDuplicatePolicy?.sendTo,
              'P'
            ),
          }
      : {};

  const approvalPosDecision =
    (!claimProcessData?.posDataDetail?.approvalPosDecision ||
      !claimProcessData?.posDataDetail?.approvalPosDecision?.posDecision) &&
    taskDefKey === TaskDefKey.PH_POS_ACT003
      ? {
          approvalPosDecision: {
            ...claimProcessData?.posDataDetail?.approvalPosDecision,
            posDecision: setInitData(
              claimProcessData?.posDataDetail?.approvalPosDecision?.posDecision,
              'A'
            ),
          },
        }
      : {};

  const inforcePosDecision =
    (!claimProcessData?.posDataDetail?.inforcePosDecision ||
      !claimProcessData?.posDataDetail?.inforcePosDecision?.posDecision) &&
    taskDefKey === TaskDefKey.PH_POS_ACT006
      ? {
          inforcePosDecision: {
            ...claimProcessData?.posDataDetail?.inforcePosDecision,
            posDecision: setInitData(
              claimProcessData?.posDataDetail?.inforcePosDecision?.posDecision,
              'A'
            ),
          },
        }
      : {};

  const originalSectionData = {
    originalSectionData: {
      changePreferredMailingAddress: {
        ...claimProcessData?.posDataDetail?.changePreferredMailingAddress,
      },
      changeContactInformation: { ...claimProcessData?.posDataDetail?.changeContactInformation },
    },
  };

  const refund = claimProcessData?.posDataDetail?.refund;

  const refundData =
    (!snapshotData || !refund?.subAccountTemp) && refund
      ? {
          refund: {
            ...refund,
            subAccountTemp: refund?.subAccountType
              ? `${refund?.subAccount} ${refund?.subAccountType}`
              : refund?.subAccount,
          },
        }
      : {};

  const initData = init
    ? {
        posDataDetail: {
          ...claimProcessData?.posDataDetail,
          ...partialWithdrawal,
          payOutOption,
          requestForIssuanceOfDuplicatePolicy,
          requestOfMailsCertificatesCorrespondences,
        },
        ...originalSectionData,
      }
    : {};

  const claimData = {
    ...claimProcessData,
    ...initData,
  };

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      ...claimData,
      submissionChannel: formUtils.queryValue(claimProcessData?.submissionChannel),
      posDataDetail: {
        ...claimData.posDataDetail,
        ...approvalPosDecision,
        ...inforcePosDecision,
        ...refundData,
      },
    };
  });

  return { ...nextState };
};

export default saveClaimProcessData;
