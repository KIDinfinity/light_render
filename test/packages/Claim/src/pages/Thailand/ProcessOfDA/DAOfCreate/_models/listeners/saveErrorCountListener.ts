export default function* saveErrorCountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'daProcessController/saveBasicInformation',
      'daProcessController/saveTreatmentItem',
      'daProcessController/saveCaseInfo',
      'daProcessController/savePayee',
      'daProcessController/saveProcedureItem',
      'daProcessController/saveServiceItem',
      'daProcessController/saveTreatmentItem',
      'daProcessController/setIncidentItemExpandStatus',
      'daProcessController/saveMainBenefitItem',
      'daProcessController/saveInsured',
      'daProcessController/saveDiagnosisItem',
      'daProcessController/saveIncidentItem',
      'daProcessController/saveInvoiceItem',
    ],
    function* action() {
      yield put({
        type: 'updateErrorCount',
      });
    }
  );
}
