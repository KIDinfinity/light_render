import DiagnosisReport, { DocumentTitle as DiagnosisReportTitle } from './DiagnosisReport';
import HospitalizationReport, {
  DocumentTitle as HospitalizationReportTitle,
} from './HospitalizationReport';
import IncidentReport, { DocumentTitle as IncidentReportTitle } from './IncidentReport';
import RequestForm, { DocumentTitle as RequestFormTitle } from './RequestForm';
import DeathReport, { DocumentTitle as DeathReportTitle } from './DeathReport';
import OtherDiagnosisReport, {
  DocumentTitle as OtherDiagnosisReportTitle,
} from './OtherDiagnosisReport';
import { DocumentTitle as DefaultFormTitle } from './DefaultForm';
import AnnuityForm, { DocumentTitle as AnnuityFormTitle } from './AnnuityForm';
import TreatmentReport, { DocumentTitle as TreatmentReportTitle } from './TreatmentReport';
import { DocumentTitleList as ArrivalImageList } from './ArrivalImageForm';
import { DocumentTitleList as UnArrivalImageList } from './UnarrivalImageForm';

export const DocumentTitles = {
  RequestForm: RequestFormTitle,
  IncidentReport: IncidentReportTitle,
  HospitalizationReport: HospitalizationReportTitle,
  DiagnosisReport: DiagnosisReportTitle,
  DefaultForm: DefaultFormTitle,
  DeathReport: DeathReportTitle,
  OtherDiagnosisReport: OtherDiagnosisReportTitle,
  AnnuityForm: AnnuityFormTitle,
  TreatmentReport: TreatmentReportTitle,
  ArrivalImageForm: ArrivalImageList,
  UnarrivalImageForm: UnArrivalImageList,
};

export default {
  RequestForm,
  IncidentReport,
  HospitalizationReport,
  DiagnosisReport,
  DeathReport,
  OtherDiagnosisReport,
  TreatmentReport,
  AnnuityForm,
};
