import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000051, VLD_000054, VLD_000052 } from '@/utils/validations';

const collectSectionErrorsOfJPCA = (claimProcessData, submited) => {
  const errors = [];
  if (VLD_000051(claimProcessData?.incidentList, submited)) {
    if (!errors.includes("SPECIAL ERROR: [incident] shouldn't be empty")) {
      errors.push("SPECIAL ERROR: [incident] shouldn't be empty");
    }
  }
  lodash.map(claimProcessData.incidentList, (incidentItem) => {
    if (VLD_000054(incidentItem.claimTypeArray, incidentItem.treatmentList) && submited) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000076' }));
    }
    if (VLD_000052(incidentItem.diagnosisList, submited)) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000072' }));
    }
  });

  return errors;
};

export { collectSectionErrorsOfJPCA };
