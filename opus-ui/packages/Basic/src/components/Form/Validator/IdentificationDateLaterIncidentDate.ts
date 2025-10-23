import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// Identification Date should't be earlier than Date Of Incident
export const IdentificationDateLaterIncidentDate = (incidentDateValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback(formatMessageApi({Label_COM_WarningMessage:'ERR_000043'}));
  }
  callback();
}
