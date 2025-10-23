import businessDataCreate from './businessDataCreate';
import clean from './clean';
import saveInsured from './saveInsured';
import claimantUpdate from './claimantUpdate';
import payeeUpdate from './payeeUpdate';
import incidentAdd from './incidentAdd';
import incidentDelete from './incidentDelete';
import incidentUpdate from './incidentUpdate';
import setIncidentItemExpandStatus from './setIncidentItemExpandStatus';
import treatmentAdd from './treatmentAdd';
import treatmentDelete from './treatmentDelete';
import treatmentUpdate from './treatmentUpdate';
import diagnosisAdd from './diagnosisAdd';
import diagnosisUpdate from './diagnosisUpdate';
import diagnosisDelete from './diagnosisDelete';
import procedureUpdate from './procedureUpdate';
import procedureDelete from './procedureDelete';
import procedureAdd from './procedureAdd';
import invoiceAdd from './invoiceAdd';
import invoiceDelete from './invoiceDelete';
import invoiceUpdate from './invoiceUpdate';
import serviceAdd from './serviceAdd';
import serviceDelete from './serviceDelete';
import serviceUpdate from './serviceUpdate';
import entryUpdate from './entryUpdate';
import cleanSubmitParam from './cleanSubmitParam';
import updateShowSearchModal from './updateShowSearchModal';
import savePartyListInfo from './savePartyListInfo';
import saveSearchInsuredInfo from './saveSearchInsuredInfo';
import saveSelectInsuredInfo from './saveSelectInsuredInfo';
import payeeAdd from './payeeAdd';
import payeeDelete from './payeeDelete';
import serviceAgentUpdate from './serviceAgentUpdate';
import saveRefreshStatus from './saveRefreshStatus';
import savePolicyAgent from './savePolicyAgent';
import submissionChannelUpdate from './submissionChannelUpdate';
import otherProcedureAdd from './otherProcedureAdd';
import otherProcedureDelete from './otherProcedureDelete';
import otherProcedureUpdate from './otherProcedureUpdate';
import updateSubmissionDate from './updateSubmissionDate';
import updateInformationPerfectionDate from './updateInformationPerfectionDate';
import klipCaseInfoAdd from './klipCaseInfoAdd';
import klipCaseInfoDelete from './klipCaseInfoDelete';
import klipCaseInfoUpdate from './klipCaseInfoUpdate';
import policyListUpdate from './policyListUpdate';
import saveKlipClaimNo from './saveKlipClaimNo';
import savePremBankAccount from './savePremBankAccount';
import saveRegisterMcs from './saveRegisterMcs';
import premiumPaymentMethodUpdate from './premiumPaymentMethodUpdate';
import saveOpTreatmentList from './saveOpTreatmentList';
import updateClaimOpTreatmentList from './updateClaimOpTreatmentList';
import opTreatmentListAdd from './opTreatmentListAdd';
import opTreatmentListDelete from './opTreatmentListDelete';
import updateCustomerRole from './updateCustomerRole';
import opTreatmentListUpdate from './opTreatmentListUpdate';

import updateDrugsListStore from './updateDrugsListStore';
import initIntegration from './initIntegration';
import popupProcedureUpdate from './popupProcedureUpdate';
import popupTreatmentUpdate from './popupTreatmentUpdate';
import saveIntegration from './saveIntegration';
import saveLifeJClaimId from './saveLifeJClaimId';
import saveLifeJClaim from './saveLifeJClaim';
import saveTreatmentProviders from './saveTreatmentProviders';
import serviceExtraUpdate from './serviceExtraUpdate';
import savePayeeDefaultBankInfo from './savePayeeDefaultBankInfo';
import savePolicyOwnerList from './savePolicyOwnerList';
import saveC360PolicyInfo from './saveC360PolicyInfo';
import procedureModalShow from './procedureModalShow';
import procedureModalUpdate from './procedureModalUpdate';
import procedureModalHidden from './procedureModalHidden';
import otherProcedureModalShow from './otherProcedureModalShow';
import otherProcedureModalUpdate from './otherProcedureModalUpdate';
import otherProcedureModalHidden from './otherProcedureModalHidden';

import {
  therapeuticMonthListInit,
  therapeuticMonthListAdd,
  therapeuticMonthListUpdate,
  therapeuticMonthListDelete,
  therapeuticMonthFirstDateAdd,
  therapeuticMonthFirstDateDelete,
  therapeuticMonthTherapeuticDateDelete,
  showDrugsDetailList,
  updateDrugsDetailList,
  saveDrugsDetailList,
  saveSearchListParams,
} from '../../../Components/Procedure/AntiCancerAndHormone/_models/reducers';

export default {
  otherProcedureModalShow,
  otherProcedureModalUpdate,
  otherProcedureModalHidden,
  procedureModalShow,
  procedureModalUpdate,
  procedureModalHidden,
  updateClaimOpTreatmentList,
  saveOpTreatmentList,
  businessDataCreate,
  clean,
  saveInsured,
  claimantUpdate,
  payeeUpdate,
  incidentAdd,
  incidentDelete,
  incidentUpdate,
  setIncidentItemExpandStatus,
  treatmentAdd,
  treatmentDelete,
  treatmentUpdate,
  diagnosisAdd,
  diagnosisUpdate,
  diagnosisDelete,
  procedureUpdate,
  procedureDelete,
  procedureAdd,
  invoiceAdd,
  invoiceDelete,
  invoiceUpdate,
  serviceAdd,
  serviceDelete,
  serviceUpdate,
  entryUpdate,
  cleanSubmitParam,
  updateShowSearchModal,
  savePartyListInfo,
  saveSearchInsuredInfo,
  saveSelectInsuredInfo,
  payeeAdd,
  payeeDelete,
  saveRegisterMcs,
  serviceAgentUpdate,
  saveRefreshStatus,
  savePolicyAgent,
  submissionChannelUpdate,
  otherProcedureAdd,
  otherProcedureDelete,
  otherProcedureUpdate,
  updateSubmissionDate,
  updateInformationPerfectionDate,
  klipCaseInfoAdd,
  klipCaseInfoDelete,
  klipCaseInfoUpdate,
  policyListUpdate,
  saveKlipClaimNo,
  savePremBankAccount,
  premiumPaymentMethodUpdate,
  opTreatmentListDelete,
  updateCustomerRole,
  opTreatmentListUpdate,
  opTreatmentListAdd,

  initIntegration,
  popupProcedureUpdate,
  popupTreatmentUpdate,
  saveIntegration,
  saveLifeJClaimId,
  saveLifeJClaim,
  saveTreatmentProviders,
  serviceExtraUpdate,
  savePayeeDefaultBankInfo,
  savePolicyOwnerList,
  saveC360PolicyInfo,

  showDrugsDetailList,
  updateDrugsDetailList,
  saveSearchListParams,
  saveDrugsDetailList,
  updateDrugsListStore,
  therapeuticMonthListInit,
  therapeuticMonthListAdd,
  therapeuticMonthListUpdate,
  therapeuticMonthListDelete,
  therapeuticMonthFirstDateAdd,
  therapeuticMonthFirstDateDelete,
  therapeuticMonthTherapeuticDateDelete,
};
