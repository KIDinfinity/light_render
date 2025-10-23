import { Category } from '../Enum';
import * as Validators from './Validators';

export default {
  [Category.DiagnosisReport]: {
    cervicalCancerCIN: {
      mappingKeys: {
        cervicalCancerDate: Validators.VLD_000172,
      },
    },
    advancedMedical: {
      mappingKeys: {
        advancedMedicalType: Validators.VLD_000181,
        startDateOfAdvancedMedical: Validators.VLD_000181,
        endDateOfAdvancedMedical: Validators.VLD_000181,
        expense: Validators.VLD_000181,
      },
    },
    startDateOfAdvancedMedical: {
      mappingKeys: {
        endDateOfAdvancedMedical: Validators.VLD_000018_Start,
      },
    },
    endDateOfAdvancedMedical: {
      mappingKeys: {
        startDateOfAdvancedMedical: Validators.VLD_000018_End,
      },
    },
    dateOfAdmission: {
      arrayItem: true,
      arrayMapping: {
        dateOfDischarge: Validators.VLD_000018_Start,
      },
    },
    dateOfDischarge: {
      arrayItem: true,
      arrayMapping: {
        dateOfAdmission: Validators.VLD_000018_End,
      },
    },
    distantMetastasis: {
      mappingKeys: {
        metastaticSites: Validators.VLD_000214,
        diagnosisDateOfDistantMetastasis: Validators.VLD_000214,
      },
    },
    histopathologicExamination: {
      mappingKeys: {
        histopathologicDiagnosisName: Validators.VLD_000087,
        histopathologicDiagnosisDate: Validators.VLD_000087,
      },
    },
    notificationOfSelfHistopathologic: {
      mappingKeys: {
        notificationDateOfSelfHistopathologic: Validators.VLD_000173,
        notificationNameOfSelfHistopathologic: Validators.VLD_000173,
      },
    },
    cancerMedicine: {
      arrayKey: 'antiCancerMedsHistory',
      validateFirst: true,
      arrayMapping: {
        dateOfCancerMedicineTreatment: Validators.VLD_000216,
      },
    },
    hormoneMedicine: {
      arrayKey: 'hormoneTreatmentHistory',
      validateFirst: true,
      arrayMapping: {
        dateOfHormoneMedicineTreatment: Validators.VLD_000217,
      },
    },
    painkiller: {
      arrayKey: 'painkillerHistory',
      validateFirst: true,
      arrayMapping: {
        dateOfPainkillerTreatment: Validators.VLD_000218,
      },
    },
    cancerTreatmentHospitalized: {
      mappingKeys: {
        calculationType: Validators.VLD_000219,
      },
      arrayKey: 'palliativeCare',
      arrayMapping: {
        startDateOfCancerHospitalization: Validators.VLD_000219,
        endDateOfCancerHospitalization: Validators.VLD_000219,
      },
    },
    startDateOfCancerHospitalization: {
      arrayItem: true,
      arrayMapping: {
        endDateOfCancerHospitalization: Validators.VLD_000018_Start,
      },
    },
    endDateOfCancerHospitalization: {
      arrayItem: true,
      arrayMapping: {
        startDateOfCancerHospitalization: Validators.VLD_000018_End,
      },
    },
    mastectomy: {
      arrayKey: 'procedure_mastect',
      arrayMapping: {
        bodyPartOfMastectomy: Validators.VLD_000210,
        dateOfMastectomy: Validators.VLD_000210,
      },
    },
    breastReconstruction: {
      arrayKey: 'procedure_breastRecon',
      arrayMapping: {
        bodyPartOfBreastReconstruction: Validators.VLD_000211,
        dateOfBreastReconstruction: Validators.VLD_000211,
      },
    },
    ovariectomy: {
      arrayKey: 'procedure_ovariect',
      arrayMapping: {
        bodyPartOfOvariectomy: Validators.VLD_000212,
        dateOfOvariectomy: Validators.VLD_000212,
      },
    },
    hysterectomy: {
      arrayKey: 'hysterectomyHistory',
      arrayMapping: {
        dateOfHysterectomy: Validators.VLD_000213,
      },
    },
    startDateOfRadiationTherapy: {
      mappingKeys: {
        endDateOfRadiationTherapy: Validators.VLD_000095_Start,
      },
    },
    endDateOfRadiationTherapy: {
      mappingKeys: {
        startDateOfRadiationTherapy: Validators.VLD_000095_End,
      },
    },
    insuredName: {
      borderMap: {
        rules: Validators.VLD_000259,
      },
    },
  },
  [Category.DeathReport]: {
    procedure: {
      mappingKeys: {
        operationDateOfSurgery: Validators.VLD_000184,
      },
    },
    dateOfAdmission: {
      arrayItem: true,
      arrayMapping: {
        dateOfDischarge: Validators.VLD_000018_Start,
      },
    },
    dateOfDischarge: {
      arrayItem: true,
      arrayMapping: {
        dateOfAdmission: Validators.VLD_000018_End,
      },
    },
    fromDate: {
      mappingKeys: {
        toDate: Validators.VLD_000095_Start,
      },
    },
    toDate: {
      mappingKeys: {
        fromDate: Validators.VLD_000095_End,
      },
    },
    insuredName: {
      borderMap: {
        rules: Validators.VLD_000259,
      },
    },
  },
  [Category.HospitalizationReport]: {
    dateOfAdmission: {
      arrayItem: true,
      arrayMapping: {
        dateOfDischarge: Validators.VLD_000018_Start,
      },
    },
    dateOfDischarge: {
      arrayItem: true,
      arrayMapping: {
        dateOfAdmission: Validators.VLD_000018_End,
      },
    },
    injuredName: {
      borderMap: {
        rules: Validators.VLD_000259,
      },
    },
  },
  [Category.AnnuityForm]: {
    preferredDistributionMethod: {
      mappingKeys: {
        deferralPeriod: Validators.VLD_000222,
        postDeferralMonthlyAnnuity: Validators.VLD_000241,
      },
    },
    insuredName: {
      borderMap: {
        rules: Validators.VLD_000259,
      },
    },
  },
  [Category.IncidentReport]: {
    injuredName: {
      borderMap: {
        rules: Validators.VLD_000259,
      },
    },
  },
  [Category.RequestForm]: {
    insuredName: {
      borderMap: {
        rules: Validators.VLD_000259,
      },
    },
  },
  [Category.OtherDiagnosisReport]: {
    insuredName: {
      borderMap: {
        rules: Validators.VLD_000259,
      },
    },
  },
  [Category.TreatmentReport]: {
    injuredName: {
      borderMap: {
        rules: Validators.VLD_000259,
      },
    },
  },
};
