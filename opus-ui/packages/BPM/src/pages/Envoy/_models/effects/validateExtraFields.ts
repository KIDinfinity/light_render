import CaseCategory from 'basic/enum/CaseCategory';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import lodash from 'lodash';

interface IAction {
  payload: {};
}

// 当前只有Non Opus Support Claim存在特殊字段必填要求
function* validateExtraFields({ payload }: IAction, { select, put }: any) {
  const { taskDetail, businessData } = yield select(
    (state: any) => state.opusNonOpusClaimManagement
  );
  const { currentReasonGroups = [] } = yield select((state: any) => state.envoyController);

  if (taskDetail?.caseCategory === CaseCategory.JP_CLM_CTG005 && currentReasonGroups?.length) {
    const currentDrafts = lodash.filter(currentReasonGroups, { status: 'Draft' });

    if (currentDrafts?.length) {
      const l13015ValidationRequired = lodash.some(currentDrafts, (draft) => {
        const { reasonDetails = [] } = draft;

        return lodash.some(reasonDetails, (detail) => {
          const { pendingMemoList = [] } = detail;
          return lodash.some(pendingMemoList, (memo) => memo?.memoCode === 'L13015');
        });
      });

      if (l13015ValidationRequired) {
        const { incidentList = [], firstMcReceiveDate } = businessData;
        const diagnosisList = lodash.get(incidentList, '[0].diagnosisList');
        const errorMsgs = [];

        if (!formUtils.queryValue(firstMcReceiveDate)) {
          errorMsgs.push(
            formatMessageApi(
              { Label_COM_WarningMessage: 'MSG_001334' },
              formatMessageApi({ Label_COM_OPUS: 'McReceiveDate' })
            )
          );
        }

        if (!lodash.get(diagnosisList, '[0].diagnosisName')) {
          errorMsgs.push(
            formatMessageApi(
              { Label_COM_WarningMessage: 'MSG_001334' },
              formatMessageApi({ Label_CLM_Opus: 'diagnosisName' })
            )
          );
        }

        if (errorMsgs.length) {
          handleWarnMessageModal(
            [
              {
                content: `${errorMsgs.join('\n')}`,
              },
            ],
            {
              okFn: () => {},
              hideCancelButton: true,
              type: 'error',
            }
          );

          return true;
        }
      }

      const hostClaimNo =
        lodash.get(businessData, 'claimDecision.hostClaimNo') ||
        lodash.get(businessData, 'incidentList[0].klipCaseInfoList[0].klipClaimNo');

      if (!formUtils.queryValue(hostClaimNo)) {
        handleWarnMessageModal(
          [
            {
              content: formatMessageApi(
                { Label_COM_WarningMessage: 'MSG_001334' },
                formatMessageApi({ Label_CLM_Opus: 'hostClaimNo' })
              ),
            },
          ],
          {
            okFn: () => {},
            hideCancelButton: true,
            type: 'error',
          }
        );

        return true;
      }
    }
  }

  return false;
}

export default validateExtraFields;
