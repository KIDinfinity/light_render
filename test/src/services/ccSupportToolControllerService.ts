import request from '@/utils/request';

export async function execute(params?: any, option?: any): Promise<any> {
  return request('/api/cc/supportTool/execute', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getExecutedHistory(params?: any, option?: any): Promise<any> {
  return request('/api/cc/supportTool/getExecutedHistory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getExecuteResult(params?: any, option?: any): Promise<any> {
  return request('/api/cc/supportTool/getExecuteResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function upload(params?: any, option?: any): Promise<any> {
  return request('/api/cc/supportTool/upload', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadRollbackSqlFile(params?: any, option?: any): Promise<any> {
  return request('/api/cc/supportTool/downloadRollbackSqlFile', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  execute,
  getExecutedHistory,
  getExecuteResult,
  upload,
  downloadRollbackSqlFile,
};
