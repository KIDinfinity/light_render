import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const saveClaimPayableListGroupResulError = (state: any, action: any) => {
  const { claimPayableListMap, settlementDecision, detailedAssessmentDecision } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    lodash.map(claimPayableListMap, (claimPayable, claimPayableId) => {
      if (settlementDecision) {
        draftState.claimEntities.claimPayableListMap[claimPayableId].settlementDecision = {
          ...(draftState.claimEntities.claimPayableListMap[claimPayableId].settlementDecision ||
            ''),
          value: formUtils.queryValue(
            draftState.claimEntities.claimPayableListMap[claimPayableId].settlementDecision
          ),
          errors: [
            {
              field: 'settlementDecision',
              message: formatMessageApi({ Label_COM_Message: 'MSG_000496' }),
            },
          ],
        };
      }
      if (detailedAssessmentDecision) {
        draftState.claimEntities.claimPayableListMap[claimPayableId].detailedAssessmentDecision = {
          ...(draftState.claimEntities.claimPayableListMap[claimPayableId]
            .detailedAssessmentDecision || ''),
          value: formUtils.queryValue(
            draftState.claimEntities.claimPayableListMap[claimPayableId].detailedAssessmentDecision
          ),
          errors: [
            {
              field: 'detailedAssessmentDecision',
              message: formatMessageApi({
                Label_COM_WarningMessage: 'ERR_000001',
              }),
            },
          ],
        };
      }
    });
  });

  return { ...nextState };
};

export default saveClaimPayableListGroupResulError;
