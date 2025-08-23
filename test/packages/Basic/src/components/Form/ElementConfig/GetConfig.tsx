/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useMemo } from 'react';
import lodash from 'lodash';
import { useLocation, useParams } from 'umi';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import {
  queryPageAtomConfigV2,
  queryPageAtomConfigUI,
} from '@/services/miscPageAtomConfigControllerService';
import { getNewNBUI } from 'process/Utils';
import { SS, SSKey } from '@/utils/cache';
import { tenant, Region } from '@/components/Tenant';

export const getConfig = async (
  caseCategory: string,
  activityCode: string,
  remote?: boolean | undefined
) => {
  const regionCode: any = SS.getItem(SSKey.CONFIGS)?.region;
  const value = await SS.get(
    `${SSKey.ELEMENT_CONFIG_MAP}_${caseCategory}_${activityCode}`,
    true,
    async () => {
      if (caseCategory && activityCode && remote === true) {
        const url = getNewNBUI({ caseCategory, taskDefKey: activityCode })
          ? queryPageAtomConfigUI
          : queryPageAtomConfigV2;

        const response = await url({
          activityCode,
          caseCategory,
          regionCode,
        });

        if (
          lodash.isPlainObject(response) &&
          response.success &&
          lodash.isArray(response.resultData) &&
          lodash.size(response.resultData)
        ) {
          return lodash.map(response.resultData, (item: any) => ({
            ...item,
            'field-props': item['field-props'],
          }));
        }

      }

      return [];
    },
    false
  );

  return value;
};

const getCommonCaseCategoryAndActivityCode = (
  caseCategory: string,
  activityCode: string,
  location?: any,
  params?: any
) => {
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
    DocumentScanning: {
      caseCategory: 'HK_DC_CTG001',
      activityCode: 'HK_DC_ACT001',
    },
    BatchDocumentScanning: {
      caseCategory: 'BP_DC_CTG002',
      activityCode: 'BP_DC_ACT001',
    },
    THdataCaptureDq: {
      caseCategory: 'BP_PAPER_CTG002',
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
    'HK_DC_CTG001.HK_DC_ACT001': 'DocumentScanning',
    'BP_DC_CTG002.BP_DC_ACT001': 'BatchDocumentScanning',
    'BP_PAPER_CTG002.BP_PAPER_ACT001': 'PHDataCapture',
    'BP_CLM_CTG008.BP_CLM_ACT004': 'PHManualAssessment',
    'BP_CLM_CTG008.BP_CLM_ACT005': 'PHManualAssessment',
    'BP_CLM_CTG008.BP_CLM_ACT006': 'PHManualAssessment',
    'BP_CLM_CTG007.BP_CLM_ACT004': 'PHManualAssessment',
    'BP_CLM_CTG007.BP_CLM_ACT005': 'PHManualAssessment',
    'BP_CLM_CTG007.BP_CLM_ACT006': 'PHManualAssessment',
    'PH_CLMUW_CTG001.PH_CLMUW_ACT001': 'PHManualAssessment',

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

const PrepareConfig = ({ taskDetail, config: localConfig, children }: any) => {
  const [config, setConfig] = useState([]);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const { caseCategory, activityCode } = getCommonCaseCategoryAndActivityCode(
        taskDetail?.caseCategory,
        taskDetail?.taskDefKey,
        location,
        params
      );

      let finalConfig = await getConfig(caseCategory, activityCode, localConfig?.remote);
      const hasRemoteConfigData =
        localConfig?.remote && lodash.isArray(finalConfig) && lodash.size(finalConfig) > 0;
      if (
        !hasRemoteConfigData &&
        lodash.isArray(localConfig?.configs) &&
        lodash.size(localConfig?.configs) > 0
      ) {
        finalConfig = localConfig?.configs;
      }

      setConfig(finalConfig);
    })();
  }, [taskDetail]);

  const newConfig = useMemo(() => {
    if (
      lodash.isEmpty(config) ||
      !localConfig?.remote ||
      !localConfig?.whiteList ||
      lodash.isEmpty(localConfig?.whiteList)
    ) {
      return config;
    }

    const whiteListField: any[] = [];
    let whiteListObject = {};

    if (!lodash.isEmpty(localConfig?.whiteList)) {
      whiteListObject = lodash.reduce(
        localConfig?.whiteList,
        (result: object, configValue: any) => {
          whiteListField.push(`${configValue.section}__${configValue.field}`);
          result[`${configValue.section}__${configValue.field}`] = configValue;
          return result;
        },
        {}
      );
    }

    const mergeField = lodash.map(config, (item: any) => {
      const index = whiteListField.findIndex(
        (fieldItem: any) => fieldItem === `${item.section}__${item.field}`
      );
      if (index > -1) {
        whiteListField.splice(index, 1);

        return lodash.merge(whiteListObject[`${item.section}__${item.field}`], item);
      }
      return item;
    });

    const exWhiltField = whiteListField.map((field: string) => whiteListObject[field]);

    return [...mergeField, ...exWhiltField];
  }, [localConfig, config]);
  return <>{React.cloneElement(children, { config: newConfig })}</>;
};

export default ({ config, children }: any) => (
  <CaseTaskDetail.Consumer>
    <PrepareConfig config={config}>{children}</PrepareConfig>
  </CaseTaskDetail.Consumer>
);
