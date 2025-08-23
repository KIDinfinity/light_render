
import { stringify } from 'qs';
import request from '@/utils/request';

export async function addDataSet(params?: any, option?: any): Promise<any> {
  return request('/api/rc/dataSet/addDataSet', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cleanDataSetByCode(params?: any, option?: any): Promise<any> {
  return request('/api/rc/dataSet/cleanDataSetByCode', {
    ...option,
    method: 'DELETE',
    body: params,
  });
}

export async function cleanDataSetById(params?: any, option?: any): Promise<any> {
  return request('/api/rc/dataSet/cleanDataSetById', {
    ...option,
    method: 'DELETE',
    body: params,
  });
}

export async function getDatasetFields(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/dataSet/getDatasetFields?${stringify(params)}`, {
    ...option,
  });
}

export async function initDataSource(params?: any, option?: any): Promise<any> {
  return request('/api/rc/dataSet/initDataSource', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listSqlColumns(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/dataSet/query/listSqlColumns?${stringify(params)}`, {
    ...option,
  });
}

export async function listTableColumns(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/dataSet/query/listTableColumns?${stringify(params)}`, {
    ...option,
  });
}

export async function listTables(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/dataSet/query/listTables?${stringify(params)}`, {
    ...option,
  });
}

export default {
  addDataSet,
  cleanDataSetByCode,
  cleanDataSetById,
  getDatasetFields,
  initDataSource,
  listSqlColumns,
  listTableColumns,
  listTables,
}
