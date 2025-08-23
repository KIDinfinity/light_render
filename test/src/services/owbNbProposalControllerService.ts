import { stringify } from 'qs';
import request from '@/utils/request';

export async function autoPremiumSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/autoPremiumSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function changeCustomerInformation(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/changeCustomerInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function clientCheckDuplicate(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/clientCheckDuplicate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function dedupCheck(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/dedupCheck', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getUWMEResult(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/getUWMEResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getUWMEReturnUrlRequestParams(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/getUWMEReturnUrlRequestParams', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function manualCreate(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/manualCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ntuManualUw(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/ntuManualUw', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ntuPremiumSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/ntuPremiumSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function partialUpdateClient(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/partialUpdateClient', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function preSubmission(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/preSubmission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function premiumCalculation(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/premiumCalculation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refreshPremium(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/refreshPremium', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function rejectPremiumSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/rejectPremiumSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retrieveDOCUpload(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/retrieveDOCUpload', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retrieveSIDoc(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/retrieveSIDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retrieveSIToken(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/retrieveSIToken', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retryAutoUW(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/retryAutoUW', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retryDedupCheck(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/retryDedupCheck', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitAutoUW(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/submitAutoUW', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitManualUW(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/submitManualUW', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitNbSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/submitNbSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPostQc(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/submitPostQc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPremiumSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/submitPremiumSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testUWMEUpdate(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/testUWMEUpdate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateClient(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/updateClient', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function supplyUwProposal(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/supplyUwProposal', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateManualUW(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/updateManualUW', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateNtuJob(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/updateNtuJob', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessJobInfo(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/process/job/getProcessJobInfo?${stringify(params)}`, {
    ...option,
  });
}
export async function validateManualUW(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/validateManualUW', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function withdrawManualUw(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/withdrawManualUw', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function withdrawPremiumSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/withdrawPremiumSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendNTU(params?: any, option?: any): Promise<any> {
  return request('/api/nb/test/sendNTU', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function triggerCaseOverdueJob(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/triggerCaseOverdueJob', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function trySustainabilityCalculate(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/trySustainabilityCalculate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sustainabilityConfirm(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/sustainabilityConfirm', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initialVersionRecovery(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/initialVersionRecovery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getEnrollVoiceFile(
  params?: {
    enrollId: string; // agentId
  },
  option?: any
): Promise<any> {
  return request(`/api/nb/voice/getEnrollment?${stringify(params)}`, {
    ...option,
  });
}

export async function getRecordVoiceFile(
  params?: {
    applicationNo: string;
    voiceRecordingLink: string; //linkId
  },
  option?: any
): Promise<any> {
  return request(`/api/nb/voice/getVoiceRecord?${stringify(params)}`, {
    ...option,
  });
}

export default {
  autoPremiumSettlement,
  changeCustomerInformation,
  create,
  dedupCheck,
  getUWMEResult,
  getUWMEReturnUrlRequestParams,
  manualCreate,
  ntuManualUw,
  ntuPremiumSettlement,
  partialUpdateClient,
  preSubmission,
  premiumCalculation,
  refreshPremium,
  rejectPremiumSettlement,
  retrieveDOCUpload,
  retrieveSIDoc,
  retrieveSIToken,
  retryAutoUW,
  retryDedupCheck,
  submitAutoUW,
  submitManualUW,
  submitNbSettlement,
  submitPostQc,
  submitPremiumSettlement,
  testUWMEUpdate,
  updateClient,
  updateManualUW,
  updateNtuJob,
  validateManualUW,
  withdrawManualUw,
  withdrawPremiumSettlement,
  sendNTU,
  getProcessJobInfo,
  triggerCaseOverdueJob,
  clientCheckDuplicate,
  sustainabilityConfirm,
  trySustainabilityCalculate,
  initialVersionRecovery,
  supplyUwProposal,
  getEnrollVoiceFile,
  getRecordVoiceFile,
};
