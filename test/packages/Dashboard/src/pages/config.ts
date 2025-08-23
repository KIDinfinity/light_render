import { toUpper } from 'lodash';
import configIcon from 'navigator/pages/Home/Watching/View/Dashboard/Components/Summary/configIcon';
import { CommonColors } from 'navigator/pages/Home/Dashboard/Enum/Colors';
export {
  getDataWithUnit,
  getLabelTemp,
} from 'navigator/pages/Home/Dashboard/ChartCardCommon/Component/utils';
export { default as DataFormat } from 'navigator/pages/Home/Dashboard/Enum/DataFormat';
import api_mock_nb from '../__mock__/api_mock_nb.json';
import api_mock_claim from '../__mock__/api_mock_claim.json';
import api_mock_pos from '../__mock__/api_mock_pos.json';
import api_mock_healthCheck from '../__mock__/api_mock_healthCheck.json';
import type { IBusinessType } from './type.d';

export const BusinessType = {
  NB: 'NB',
  CLAIM: 'Claim',
  POS: 'POS',
  HEALTHCHECK: 'HealthCheck',
};

export const ModuleName = {
  Submission: 'submission',
  Underwriting: 'underwriting',
  InProgress: 'inprogress',
};

export const HealthCheckModuleName = {
  Envoy: 'ENVOY',
  JobCenter: 'JOB CENTER',
  Submission: 'SUBMISSION',
  Document: 'DOCUMENT',
  SysConnect: 'SYSTEM CONNECT',
  IntegrationExecutionTime: 'INTEGRATION EXECUTIONTIME',
};

// for change type order
export const BusinessArrays = [
  BusinessType.NB,
  BusinessType.CLAIM,
  BusinessType.POS,
  // BusinessType.HEALTHCHECK,
];

const searchParams = new URL(document.location as any).searchParams;

const skipHealthCheckMock = searchParams
  ?.get('skipMock')
  ?.split(',')
  ?.reduce(
    (data: any, key: string) => ({
      ...data,
      [key]: 1,
    }),
    {}
  );

export const BusinessConfig = {
  [BusinessType.NB]: {
    MonitorCode: {
      [ModuleName.Submission]: 'monitor_submission_nb',
      [ModuleName.Underwriting]: 'monitor_uw_nb',
      [ModuleName.InProgress]: 'monitor_in_progress_nb',
    },
    getActivityKeys: () => ({
      Dedup: '#E87722',
      'Auto UW': '#F3BB90',
      'Auto Prem': '#B6E6D8',
      Settlement: '#3097a9',
    }),
    mockData: api_mock_nb,
  },
  [BusinessType.CLAIM]: {
    MonitorCode: {
      [ModuleName.Submission]: 'monitor_submission_claim',
      [ModuleName.Underwriting]: 'monitor_manual_assess_claim',
      [ModuleName.InProgress]: 'monitor_in_progress_claim',
    },
    getActivityKeys: (region?: string) => ({
      'Auto Assessment': '#E87722',
      ...(region && /TH/i.test(region) ? {} : { 'Claim Settlement': '#B6E6D8' }),
    }),
    mockData: api_mock_claim,
  },
  [BusinessType.POS]: {
    MonitorCode: {
      [ModuleName.Submission]: 'monitor_submission_pos',
      [ModuleName.Underwriting]: 'monitor_decision_pos',
      [ModuleName.InProgress]: 'monitor_in_progress_pos',
    },
    getActivityKeys: () => ({
      'Auto Assessment': '#E87722',
      'Auto Settlement': '#B6E6D8',
    }),
    mockData: api_mock_pos,
  },
  [BusinessType.HEALTHCHECK]: {
    MonitorCode: {
      [HealthCheckModuleName.Envoy]: 'monitor_envoy_sum',
      [HealthCheckModuleName.JobCenter]: 'monitor_job_center_sum',
      [HealthCheckModuleName.Submission]: 'monitor_submission_sum',
      [HealthCheckModuleName.Document]: 'monitor_document_sum',
      [HealthCheckModuleName.SysConnect]: 'monitor_sysConnect_sum',
      [HealthCheckModuleName.IntegrationExecutionTime]: 'monitor_integration_executionTime_sum',
    },
    skipMock: skipHealthCheckMock || {},
    MonitorDetailCode: {
      [HealthCheckModuleName.Envoy]: 'monitor_envoy_detail',
      [HealthCheckModuleName.JobCenter]: 'monitor_job_center_detail',
      [HealthCheckModuleName.Submission]: 'monitor_submission_detail',
      [HealthCheckModuleName.Document]: 'monitor_document_detail',
      [HealthCheckModuleName.SysConnect]: 'monitor_sysConnect_detail',
      [HealthCheckModuleName.IntegrationExecutionTime]: 'monitor_integration_executionTime_detail',
    },
    getActivityKeys: () => ({
      MY: '#E87722',
      TH: '#F3BB90',
      ID: '#0097A9',
      PH: '#B6E6D8',
    }),
    mockData: api_mock_healthCheck,
  },
};

export const getActivityColors = (
  fields: string[],
  businessType: IBusinessType,
  region: string
) => {
  const colorsMap: any = BusinessConfig?.[businessType]?.getActivityKeys?.(region) || {};
  const newColors = fields.map((field) => colorsMap[field]).filter((item) => !!item);
  return newColors.concat(CommonColors.filter((item) => !newColors.includes(item)));
};

export const defaultState = Object.values(BusinessType).reduce(
  (acc: any, key: string) => ({
    ...acc,
    [key]: {},
  }),
  {}
);

export const defaultLoadingState = Object.values(BusinessType).reduce(
  (acc: any, key: string) => ({
    ...acc,
    [key]: Object.keys(BusinessConfig?.[key]?.MonitorCode || {}).reduce(
      (moduleAcc: any, moduleKey: string) => ({
        ...moduleAcc,
        [moduleKey]: true,
      }),
      {}
    ),
  }),
  {}
);

export const getDefaultConf = (region: string) => ({
  title: toUpper(region),
  icon: null,
});

// for submission card
export const colors = [
  '#6ECEB2',
  '#B6E6D8',
  '#0097A9',
  '#F3BB90',
  '#FEE8A0',
  '#7FCBD4',
  '#CCEAEE',
  '#E87722',
];

export const reportColors = CommonColors;

export const defaultChartList = [
  {
    dashboardCode: 'DAS_00001_01',
    chartType: 'bar_chart',
    dataFormat: 'number',
    chartData: {
      data: [],
      fields: [],
      name: '',
      x: '',
    },
    format: null,
    title: 'In Progress',
    width: 200,
    forceFit: true,
    smallScreenFit: {},
    xAxis: {
      label: {
        visible: false,
      },
    },
  },
  {
    dashboardCode: 'DAS_00001_02',
    chartType: 'pie_chart',
    dataFormat: 'number',
    chartData: {
      data: [],
      fields: [],
      name: '',
      x: '',
    },
    format: null,
    title: 'Manual Underwriting',
    width: 400,
    forceFit: false,
    smallScreenFit: {},
  },
];

export default {
  TH: {
    icon: configIcon?.TH,
    title: 'TH',
  },
  IB: {
    icon: configIcon?.MY,
    title: 'IB',
  },
  TAKAFUL: {
    title: 'TKF',
    icon: configIcon?.MY,
  },
  TAKAFU: {
    title: 'TKF',
    icon: configIcon?.MY,
  },
  TKF: {
    title: 'TKF',
    icon: configIcon?.MY,
  },
  PH: {
    icon: configIcon?.PH,
    title: 'PH',
  },
  ID: {
    title: 'ID',
    icon: configIcon?.ID,
  },
  VN: {
    title: 'VN',
    icon: configIcon?.VN,
  },
  JP: {
    title: 'JP',
    icon: configIcon?.JP,
  },
  HK: {
    title: 'HK',
    icon: configIcon?.HK,
  },
  KH: {
    title: 'KH',
    icon: configIcon?.KH,
  },
  MY: {
    title: 'MY',
    icon: configIcon?.MY,
  },
  FIB: {
    title: 'FWDIB',
    icon: configIcon?.MY,
  },
  FWDIB: {
    title: 'FWDIB',
    icon: configIcon?.MY,
  },
};
