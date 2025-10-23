import { produce } from 'immer';
import lodash from 'lodash';
import { isManualHK } from 'claim/enum/claimDecision';
import { DropdownPRCCaseCategory, SubmissionChannel } from 'claim/enum';

const saveCaseInfo = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const fieldsArray = Object.entries(changedFields);
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'isManual')) {
      if (changedFields?.isManual?.value) {
        finalChangedFields.isManual = isManualHK.Yes;
      } else {
        finalChangedFields.isManual = isManualHK.No;
      }
    }
    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];

      if (lodash.has(changedFields, 'caseCategory')) {
        finalChangedFields.submissionChannel =
          DropdownPRCCaseCategory.eSubmission === value
            ? SubmissionChannel.eSubmission
            : SubmissionChannel.scanner;
      }
    }

    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveCaseInfo;
