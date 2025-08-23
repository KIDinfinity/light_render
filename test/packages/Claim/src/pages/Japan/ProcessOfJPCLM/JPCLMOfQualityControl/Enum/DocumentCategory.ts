import Category from './Category';
/**
 *  key : reportType ,
 *  value : Document category
 */
const DocumentCategory = {
  '00001': Category.RequestForm, // 请求书
  '00002': Category.RequestForm,
  '00003': Category.RequestForm,

  '00004': Category.DeathReport, // 死亡证明书
  '00005': Category.DeathReport,

  '00006': Category.DiagnosisReport, // 诊断书
  '00007': Category.DiagnosisReport,
  '00008': Category.DiagnosisReport,
  '00009': Category.DiagnosisReport,
  '00010': Category.DiagnosisReport,
  '00011': Category.DiagnosisReport,
  '00012': Category.DiagnosisReport,
  '00013': Category.DiagnosisReport,
  '00014': Category.DiagnosisReport,

  '00015': Category.HospitalizationReport, // 入院状态报告书
  '00016': Category.HospitalizationReport,

  '00017': Category.TreatmentReport, // 治疗状况报告书

  '00018': Category.DiagnosisReport, // 他社診断書の写し

  '00019': Category.IncidentReport, // 事故状況報告書

  '00022': Category.AnnuityForm, // 年金受取方法指図書
  '00023': Category.AnnuityForm,
  '00069': Category.AnnuityForm,

  default: Category.DefaultForm,
};

export default DocumentCategory;
