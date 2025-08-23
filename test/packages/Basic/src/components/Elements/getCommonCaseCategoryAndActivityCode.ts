import { Region, tenant } from '@/components/Tenant';

import lodash from 'lodash';

interface Iprops {
  caseCategory: string;
  activityCode: string;
  location?: any;
  params?: any;
}

const getCommonCaseCategoryAndActivityCode = ({
  caseCategory,
  activityCode,
  location,
  params,
}: Iprops) => {
  const commonConfigMapping = {
    JPdataCapture: {
      caseCategory: 'JP_CLM_CTG001',
      activityCode: 'JP_CLM_ACT001',
    },
    JPManualAssessment: {
      caseCategory: 'JP_CLM_CTG001',
      activityCode: 'JP_CLM_ACT003',
    },
    HKdataCapture: {
      caseCategory: 'HK_CLM_CTG001',
      activityCode: 'HK_CLM_ACT001',
    },
    HKManualAssessment: {
      caseCategory: 'HK_CLM_CTG001',
      activityCode: 'HK_CLM_ACT003',
    },
    THdataCapture: {
      caseCategory: 'TH_CLM_CTG002',
      activityCode: 'TH_CLM_ACT001',
    },
    THManualAssessment: {
      caseCategory: 'TH_CLM_CTG002',
      activityCode: 'TH_CLM_ACT004',
    },
    KHCustomerIdentification: {
      caseCategory: 'BP_NB_CTG001',
      activityCode: 'BP_NB_ACT002',
    },
    PHManualUnderwriting: {
      caseCategory: 'BP_NB_CTG001',
      activityCode: 'BP_NB_ACT004',
    },
    PHDataCapture: {
      caseCategory: 'BP_PAPER_CTG002',
      activityCode: 'BP_PAPER_ACT001',
    },
    PHManualAssessment: {
      caseCategory: 'BP_CLM_CTG008',
      activityCode: 'BP_CLM_ACT004',
    },
    PHPostManualAssessment: {
      caseCategory: 'BP_PAPER_CTG002',
      activityCode: 'BP_CLM_ACT004',
    },
    Servicing: {
      caseCategory: 'BP_SRV_CTG002',
      activityCode: 'BP_SRV_ACT002',
    },
    IDdataCapture: {
      caseCategory: 'BP_CLM_CTG002',
      activityCode: 'BP_V2_CLM_ACT001',
    },
    IDManualAssessment: {
      caseCategory: 'BP_CLM_CTG002',
      activityCode: 'BP_V2_CLM_ACT004',
    },
    THdataCaptureDq: {
      caseCategory: 'BP_PAPER_CTG002',
      activityCode: 'BP_PAPER_ACT001',
    },
    MYFIBManualUnderwriting: {
      caseCategory: 'BP_NB_CTG005',
      activityCode: 'BP_NB_ACT004',
    },
    THDataValidation: {
      caseCategory: 'BP_PAPER_CTG003',
      activityCode: 'BP_PAPER_ACT001',
    },
  };
  // 暂时不细分到流程节点，泰国三条流程用一套配置数据
  const pageMapping = {
    JP_CLM_CTG001: 'JPManualAssessment',
    JP_CLM_CTG002: 'JPManualAssessment',
    JP_CLM_CTG003: 'JPManualAssessment',
    'JP_CLM_CTG001.JP_CLM_ACT001': 'JPdataCapture',
    'JP_CLM_CTG001.JP_CLM_ACT004': 'JPManualAssessment',
    'JP_CLM_CTG001.JP_CLM_ACT005': 'JPManualAssessment',
    'JP_CLM_CTG002.JP_CLM_ACT001': 'JPdataCapture',
    'JP_CLM_CTG002.JP_CLM_ACT004': 'JPManualAssessment',
    'JP_CLM_CTG002.JP_CLM_ACT005': 'JPManualAssessment',
    'JP_CLM_CTG003.JP_CLM_ACT009': 'JPManualAssessment',
    HK_CLM_CTG001: 'HKManualAssessment',
    HK_CLM_CTG002: 'HKManualAssessment',
    HK_CLM_CTG003: 'HKManualAssessment',
    'HK_CLM_CTG001.HK_CLM_ACT001': 'HKdataCapture',
    'HK_CLM_CTG002.HK_CLM_ACT001': 'HKdataCapture',
    'HK_CLM_CTG001.HK_CLM_ACT004': 'HKManualAssessment',
    'HK_CLM_CTG001.HK_CLM_ACT005': 'HKManualAssessment',
    'HK_CLM_CTG002.HK_CLM_ACT003': 'HKManualAssessment',
    'HK_CLM_CTG002.HK_CLM_ACT004': 'HKManualAssessment',
    'HK_CLM_CTG002.HK_CLM_ACT005': 'HKManualAssessment',
    'HK_CLM_CTG003.HK_CLM_ACT008': 'HKManualAssessment',
    'BP_CLM_CTG005.BP_CLM_ACT002': 'HKManualAssessment',
    TH_CLM_CTG001: 'THManualAssessment',
    TH_CLM_CTG002: 'THManualAssessment',
    TH_CLM_CTG003: 'THManualAssessment',
    'TH_CLM_CTG001.TH_CLM_ACT001': 'THdataCapture',
    'TH_CLM_CTG002.TH_CLM_ACT001': 'THdataCapture',
    'TH_CLM_CTG002.TH_CLM_ACT004': 'THManualAssessment',
    'TH_CLM_CTG001.TH_CLM_ACT004': 'THManualAssessment',
    'TH_CLM_CTG001.TH_CLM_ACT005': 'THManualAssessment',
    'TH_CLM_CTG002.TH_CLM_ACT005': 'THManualAssessment',
    'TH_CLM_CTG001.TH_CLM_ACT006': 'THManualAssessment',
    'TH_CLM_CTG002.TH_CLM_ACT006': 'THManualAssessment',
    'TH_CLM_CTG003.TH_CLM_ACT008': 'THManualAssessment',
    'BP_NB_CTG002.BP_NB_ACT008': 'KHCustomerIdentification',
    'BP_NB_CTG003.BP_NB_ACT008': 'PHManualUnderwriting',
    'BP_AP_CTG02.BP_AP_ACT003': 'PHManualUnderwriting',
    BP_SRV_CTG002: 'Servicing',
    'BP_CLM_CTG002.BP_V2_CLM_ACT001': 'IDdataCapture',
    'BP_CLM_CTG002.BP_V2_CLM_ACT004': 'IDManualAssessment',
    'BP_CLM_CTG002.BP_V2_CLM_ACT005': 'IDManualAssessment',
    'BP_CLM_CTG002.BP_V2_CLM_ACT006': 'IDManualAssessment',
    'BP_CLM_CTG004.BP_V2_CLM_ACT008': 'IDManualAssessment',
    BP_CLM_CTG002: 'IDManualAssessment',
    BP_CLM_CTG004: 'IDManualAssessment',
    'ID_CLM_CTG001.ID_CLM_ACT001': 'IDManualAssessment',
    'NB_UW_CTG006.NB_UW_ACT001': 'MYFIBManualUnderwriting',
    'NB_UW_CTG005.NB_UW_ACT002': 'MYFIBManualUnderwriting',
    'BP_UW_CTG003.NB_UW_ACT001': 'MYFIBManualUnderwriting',
    'BP_PAPER_CTG002.BP_PAPER_ACT001': 'PHDataCapture',
    'BP_CLM_CTG008.BP_CLM_ACT004': 'PHManualAssessment',
    'BP_CLM_CTG008.BP_CLM_ACT005': 'PHPostManualAssessment',
    'BP_CLM_CTG008.BP_CLM_ACT006': 'PHPostManualAssessment',
    BP_CLM_CTG007: 'PHPostManualAssessment',
    BP_CLM_CTG008: 'PHPostManualAssessment',
    'BP_CLM_CTG007.BP_CLM_ACT004': 'PHManualAssessment',
    'BP_CLM_CTG007.BP_CLM_ACT005': 'PHPostManualAssessment',
    'BP_CLM_CTG007.BP_CLM_ACT006': 'PHPostManualAssessment',
    BP_AP_CTG01: 'PHPostManualAssessment',
    'BP_AP_CTG01.BP_AP_ACT001': 'PHManualAssessment',
    'BP_AP_CTG01.BP_AP_ACT002': 'PHPostManualAssessment',
    'NB_UW_CTG001.NB_UW_ACT001': 'PHManualUnderwriting',
    'BP_AP_CTG03.BP_AP_ACT003': 'MYFIBManualUnderwriting',
    'BP_NB_CTG003.BP_NB_ACT004': 'PHManualUnderwriting',
    'BP_NB_CTG005.BP_NB_ACT007': 'MYFIBManualUnderwriting',
    'BP_NB_CTG001.BP_NB_ACT003': 'PHManualUnderwriting',
    'VN_UW_CTG001.VN_UW_ACT001': 'PHManualUnderwriting',
    'BP_NB_CTG002.BP_NB_ACT004': 'PHManualUnderwriting',
    'PH_CLMUW_CTG001.PH_CLMUW_ACT001': 'PHPostManualAssessment',
    'BP_PAPER_CTG003.BP_PAPER_ACT001': 'THDataValidation',
    'BP_NB_CTG001.history': 'PHManualUnderwriting',
    'BP_NB_CTG003.history': 'PHManualUnderwriting',
    'BP_AP_CTG02.history': 'PHManualUnderwriting',
    'NB_UW_CTG001.history': 'PHManualUnderwriting',
    'VN_UW_CTG001.history': 'PHManualUnderwriting',
    'BP_NB_CTG002.history': 'PHManualUnderwriting',
    'BP_NB_CTG005.history': 'MYFIBManualUnderwriting',
    'NB_UW_CTG006.history': 'MYFIBManualUnderwriting',
    'NB_UW_CTG005.history': 'MYFIBManualUnderwriting',
    'BP_UW_CTG003.history': 'MYFIBManualUnderwriting',
    'BP_AP_CTG03.history': 'MYFIBManualUnderwriting',
    ...tenant.region({
      [Region.PH]: {
        'BP_PAPER_CTG002.BP_PAPER_ACT002': 'PHDataCapture',
      },
      [Region.TH]: {
        'BP_PAPER_CTG002.BP_PAPER_ACT002': 'THdataCaptureDq',
      },
      notMatch: {},
    }),
  };

  // eworksheet 页面只用 MYFIBManualUnderwriting 或 PHManualUnderwriting
  if (window.location.pathname.includes('/nb/uw/ews')) {
    const eworksheetMapping = [
      'BP_NB_CTG005',
      'BP_AP_CTG03',
      'NB_UW_CTG006',
      'NB_UW_CTG005',
      'BP_UW_CTG003',
    ].includes(caseCategory)
      ? commonConfigMapping.MYFIBManualUnderwriting
      : commonConfigMapping.PHManualUnderwriting;
    return eworksheetMapping;
  }

  if (window.location.pathname.includes('/nb/history')) {
    return commonConfigMapping[pageMapping[`${caseCategory}.history`]];
  }

  const template: string | undefined =
    lodash.isEmpty(caseCategory) &&
    lodash.isEmpty(activityCode) &&
    !lodash.isEmpty(location?.query?.caseCategory || params?.caseCategory) &&
    location.pathname.indexOf('history')
      ? pageMapping[`${location?.query?.caseCategory || params?.caseCategory}`]
      : pageMapping[`${caseCategory}.${activityCode}`];

  const result: { caseCategory: string; activityCode: string } = template
    ? commonConfigMapping[template]
    : {
        caseCategory,
        activityCode,
      };

  return result;
};

export default getCommonCaseCategoryAndActivityCode;
