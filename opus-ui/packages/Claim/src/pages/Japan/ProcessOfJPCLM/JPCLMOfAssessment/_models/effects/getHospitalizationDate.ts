import lodash from 'lodash';

export default function* getVld000019Map({ payload }: any, { select }: any) {
  const treatmentListMap = yield select(
    (state: any) => state.JPCLMOfClaimAssessmentController.claimEntities.treatmentListMap
  );
  const incidentListMap = yield select(
    (state: any) => state.JPCLMOfClaimAssessmentController.claimEntities.incidentListMap
  );
  const { treatmentId } = payload;
  const contrast = lodash
    .chain(treatmentListMap)
    .filter((item: any) => item.id !== treatmentId)
    .map((item) => {
      const incidentNo = lodash.get(incidentListMap, `${item.incidentId}.incidentNo`);
      return {
        dateOfAdmission: item.dateOfAdmission,
        dateOfDischarge: item.dateOfDischarge,
        incidentNo,
        treatmentNo: item.treatmentNo,
        incidentId: item.incidentId,
      };
    })
    .value();
  return contrast;
}
