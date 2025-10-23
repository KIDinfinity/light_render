import request from '@/utils/request';

export async function login(params?: any, option?: any) {
  return request('/api/workspace/user/login', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function logout(params?: any, option?: any) {
  return request('/api/workspace/user/logout', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function loginTHSSO(params?: any, option?: any) {
  return request('/api/workspace/user/loginThSSO', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getEnvProfile(params?: any, option?: any) {
  return request('/api/workspace/getEnvProfile', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getEncryptURL(params?: any, option?: any) {
  return request(`/api/workspace/encryptURL?url=${params}`, {
    ...option,
  });
}

export async function updatePassword(params?: any, option?: any) {
  return request('/api/uc/user/security/updatePassword', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendRecoveryLinkEmail(params?: any, option?: any) {
  return request('/api/workspace/user/sendRecoveryLinkEmail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resetPassword(params?: any, option?: any) {
  return request('/api/workspace/user/resetPassword', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function authenticationChannel(params?: any, option?: any) {
  return request('/api/workspace/user/authenticationChannel', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function nativeLogin(params?: any, option?: any) {
  return request('/api/workspace/user/nativeLogin', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function loginHkSSO(params?: any, option?: any) {
  return request('/api/workspace/user/loginHkSSO', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function loginOktaSSO(params?: any, option?: any) {
  return request('/api/workspace/user/loginOktaSSO', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getLoginUsers(params?: any, option?: any) {
  return request('/api/workspace/operation/getLoginUsers', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function publishServiceDownNotice(params?: any, option?: any) {
  return request('/api/workspace/operation/publishServiceDownNotice', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getServiceDownInfo(params?: any, option?: any) {
  return request('/api/workspace/operation/getServiceDownInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function cancelServiceDownNotice(params?: any, option?: any) {
  return request('/api/workspace/operation/cancelServiceDownNotice', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function stopService(params?: any, option?: any) {
  return request('/api/workspace/operation/stopService', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function resumeService(params?: any, option?: any) {
  return request('/api/workspace/operation/resumeService', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getSystemStatus(params?: any, option?: any) {
  return request('/api/workspace/operation/getSystemStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function sendKickOutNotice(params?: any, option?: any) {
  return request('/api/workspace/operation/sendKickOutNotice', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getUserPersonalInfo(params?: any, option?: any) {
  return request('/api/workspace/user/getUserPersonalInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function sendVerCodeEmail(params?: any, option?: any) {
  return request('/api/workspace/user/sendVerCodeEmail', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function resetPasswordByVerCode(params?: any, option?: any) {
  return request('/api/workspace/user/resetPasswordByVerCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getEnvProfile,
  getEncryptURL,
  login,
  logout,
  loginTHSSO,
  updatePassword,
  sendRecoveryLinkEmail,
  resetPassword,
  authenticationChannel,
  nativeLogin,
  loginHkSSO,
  loginOktaSSO,
  getLoginUsers,
  publishServiceDownNotice,
  getServiceDownInfo,
  cancelServiceDownNotice,
  stopService,
  resumeService,
  getSystemStatus,
  sendKickOutNotice,
  getUserPersonalInfo,
  sendVerCodeEmail,
  resetPasswordByVerCode,
};
