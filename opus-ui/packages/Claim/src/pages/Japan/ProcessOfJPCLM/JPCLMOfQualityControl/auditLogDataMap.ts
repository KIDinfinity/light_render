import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
  bpoBatchDataVO: {
    bpoDocumentDataList: {
      bpoFormDataList: {
        formData: {
          admission: {
            title: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.admission' }),
          },
          procedure: {
            title: formatMessageApi({
              Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.procedure',
            }),
          },
          procedure_mastect: {
            title: formatMessageApi({
              Label_BPM_Button: 'venus_claim.button.mastectomy_procedure',
            }),
          },
          procedure_breastRecon: {
            title: formatMessageApi({
              Label_BPM_Button: 'venus_claim.button.breast-reconstruction_procedure',
            }),
          },
          procedure_ovariect: {
            title: formatMessageApi({
              Label_BPM_Button: 'venus_claim.button.ovariectomy_procedure',
            }),
          },
          hysterectomyHistory: {
            title: formatMessageApi({
              Label_BPM_Button: 'venus_claim.button.hysterectomy-history_procedure',
            }),
          },
          otherExam_MN: {
            title: formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.label.malignant_otherExaminationOfHistopathologic',
            }),
          },
          regularTreatment_MN: {
            title: formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.label.malignant_histopathologicHospitalization',
            }),
          },
          otherExam_IN: {
            title: formatMessageApi({
              Label_BIZ_Claim:
                'venus_claim.label.intraepithelial_otherExaminationOfHistopathologic',
            }),
          },
          regularTreatment_IN: {
            title: formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.label.intraepithelial_histopathologicHospitalization',
            }),
          },
          antiCancerMedsHistory: {
            title: formatMessageApi({
              Label_BIZ_Claim: 'claim.medicine.dateOfCancerMedicineTreatment',
            }),
          },
          hormoneTreatmentHistory: {
            title: formatMessageApi({
              Label_BIZ_Claim: 'claim.medicine.dateOfHormoneMedicineTreatment',
            }),
          },
          painkillerHistory: {
            title: formatMessageApi({
              Label_BIZ_Claim: 'claim.medicine.dateOfPainkillerTreatment',
            }),
          },
          palliativeCare: {
            title: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.medicine_admission' }),
          },
          procedures: {
            title: formatMessageApi({
              Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.procedure',
            }),
          },
          treatmentHistory: {
            title: formatMessageApi({ Label_BIZ_Claim: 'claim.treatment.dateOfTreatment' }),
          },
        },
      },
    },
  },
});
