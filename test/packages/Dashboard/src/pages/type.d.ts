import type { BusinessType, ModuleName, HealthCheckModuleName } from './config';

// 通用类型定义
type IBusinessType = keyof typeof BusinessType;
type IModuleName = keyof typeof ModuleName;
type IHealthCheckModuleName = keyof typeof HealthCheckModuleName;

// 模块类型映射
type ModuleMap<K extends IBusinessType> = K extends 'HEALTHCHECK'
  ? { [M in IHealthCheckModuleName]?: boolean }
  : { [M in IModuleName]?: boolean };

type DataMap<K extends IBusinessType> = K extends 'HEALTHCHECK'
  ? { [M in IHealthCheckModuleName]?: any[] }
  : {
      [ModuleName.Submission]: ISubmissionData[];
      [ModuleName.Underwriting]: IUWDataType[];
      [ModuleName.InProgress]: IInprgressType[];
    };

type ErrorMap<K extends IBusinessType> = K extends 'HEALTHCHECK'
  ? { [M in IHealthCheckModuleName]?: IErrorResponse }
  : { [M in IModuleName]?: IErrorResponse };

// 类型定义
type ILoadingState = { [K in IBusinessType]: ModuleMap<K> };
type IMonitorDatas = { [K in IBusinessType]: DataMap<K> };
type IErrorMessage = { [K in IBusinessType]: ErrorMap<K> };
type ICountType = { [K in IBusinessType]?: number };

// 接口定义
interface QueryMonitor {
  setLoading: (loading: boolean) => void;
  setData: (data: any) => void;
  monitorCategory: string;
}

interface IInprgressType {
  region: string;
  current_activity_key: string;
  total_count: string;
}

interface IUWDataType {
  region: string;
  status: string;
  total_count: string;
}
interface ISubmissionData {
  region: string;
  current_month?: string;
  submission_channel: string;
  total_count: number;
  stp_rate: number;
  order: number;
  color?: string;
  class?: string;
  [key: string]: any;
}

interface IErrorResponse {
  messageList: {
    content: string;
  }[];
}

interface ChartCardProps {
  chart: {
    region: string;
    chartDatas: any;
  };
  businessType: IBusinessType;
}

// 导出
export {
  QueryMonitor,
  IUWDataType,
  IInprgressType,
  ISubmissionData,
  IErrorResponse,
  IBusinessType,
  IModuleName,
  IHealthCheckModuleName,
  ILoadingState,
  IMonitorDatas,
  IErrorMessage,
  ICountType,
  ChartCardProps,
};
