import request from '@/utils/request';

export async function find(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/find', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findMicroInfoByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/findMicroInfoByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findOrganizationByOwner(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/findOrganizationByOwner', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findOrganizationByParentCode(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/findOrganizationByParentCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function page(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/page', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function treeFindOrganization(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/treeFindOrganization', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function treeFindOrganizationByOwner(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/treeFindOrganizationByOwner', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function treeFindOrganizationByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/treeFindOrganizationByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function treeFindOrganizationMembersByCode(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/treeFindOrganizationMembersByCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findOrganizationByOwnerId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/organization/findOrganizationByOwnerId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refreshSession(): Promise<any> {
  return request('/api/uc/support/refreshSession', { method: 'POST' });
}

export default {
  find,
  findMicroInfoByUserId,
  findOrganizationByOwner,
  findOrganizationByParentCode,
  page,
  treeFindOrganization,
  treeFindOrganizationByOwner,
  treeFindOrganizationByUserId,
  treeFindOrganizationMembersByCode,
  findOrganizationByOwnerId,
  refreshSession,
};
