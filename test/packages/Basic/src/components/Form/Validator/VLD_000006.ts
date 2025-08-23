import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param isNoDiagnosisListMap Diagnosis是否为空
 */
export const VLD_000006 = (isNoDiagnosisListMap: any = {}) => {
  if (isNoDiagnosisListMap) {
    const ErrorMSG = formatMessageApi(
      { Label_COM_WarningMessage: 'MSG_000011' },
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      })
    );
    return ErrorMSG;
  }
};
