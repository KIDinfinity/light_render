import type { IInvoice } from './InvoiceModel';
import type { IJPMedicineTreatment } from './JPMedicineTreatmentModel';
import type { IJPProcedure } from './JPProcedureModel';
import type { IProcedure } from './ProcedureModel';
// 治疗数据模型
export interface ITreatment {
  claimNo: string;
  creator: string;
  dateOfAdmission: Date;
  dateOfConsultation: Date;
  dateOfDischarge: Date;
  deleted: number;
  department: string;
  doctor: string;
  gmtCreate: Date;
  gmtModified: Date;
  icu: number;
  icuDays: number;
  icuFromDate: Date;
  icuToDate: Date;
  id: string;
  incidentId: string;
  invoiceList: IInvoice[];
  jpMedicineTreatmentList: IJPMedicineTreatment[];
  medicalProvider: string;
  modifier: string;
  otherProcedureList: IJPProcedure[];
  patientNo: string;
  procedureList: IProcedure[];
  transId: string;
  treatmentNo: string;
  treatmentType: string;
  selected: boolean;
}
