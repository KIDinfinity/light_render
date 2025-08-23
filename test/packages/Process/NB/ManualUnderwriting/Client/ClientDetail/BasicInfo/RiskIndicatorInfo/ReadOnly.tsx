import React from 'react';
import { Region, tenant } from '@/components/Tenant';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import useGetRiskIndicatorConfigList from 'process/NB/ManualUnderwriting/_hooks/useGetRiskIndicatorConfigList';
import useGetRiskIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetRiskIndicator';
import { localConfig } from './Section';
import { ReactComponent as WarningIcon } from 'process/assets/warning.svg';
import useShowNSS from 'process/NB/ManualUnderwriting/_hooks/useShowNSS';
import useShowCRR from 'process/NB/ManualUnderwriting/_hooks/useShowCRR';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

const section = 'RiskIndicatorInfo';
const ReadOnly = ({ expand, id, isSubCard, mode }: any) => {
  const riskIndicatorConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.riskIndicatorConfigList,
    shallowEqual
  );
  useGetRiskIndicator();
  const tagList = useGetRiskIndicatorConfigList({
    id,
  });

  const { riskScore: amlRiskScore, fecRiskMsg } = lodash.pick(
    lodash.find(riskIndicatorConfigList, {
      clientId: id,
      riskFactorCode: 'AML',
    }),
    ['riskScore', 'fecRiskMsg']
  );

  const { riskScore, riskLevel, fecRiskMsg: fecRiskMsgCRR } = lodash.pick(
    lodash.find(riskIndicatorConfigList, {
      clientId: id,
      riskFactorCode: 'CRR',
    }),
    ['riskScore', 'riskLevel', 'fecRiskMsg']
  );
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });

  const data = useGetDataBySection({
    section,
    config,
    id,
  });

  const isShowNSS = useShowNSS(id);
  const isShowCRR = useShowCRR(id);

  const IDDate = lodash.map(data, (item) => {
    if (item.key === 'fecRiskMsg') {
      return {
        ...item,
        value: fecRiskMsg,
      };
    }
    if (item.key === 'fecRiskMsgCRR') {
      return {
        ...item,
        value: fecRiskMsgCRR,
      };
    } else {
      return item;
    }
  });
  const KHDate = lodash.map(data, (item) => {
    switch (item.key) {
      case 'fecRiskMsg':
        return {
          ...item,
          value: fecRiskMsg,
        };
      case 'riskScore':
        return {
          ...item,
          value: riskScore,
        };
      case 'riskLevel':
        return {
          ...item,
          value: riskLevel,
        };
      case 'amlRiskScore':
        return {
          ...item,
          value: amlRiskScore,
        };
      default:
        return item;
    }
  });

  const readOnlydata = tenant.region({
    [Region.VN]: data,
    [Region.KH]: KHDate,
    [Region.ID]: isShowNSS || isShowCRR ? IDDate : void 0,
    notMatch: void 0,
  });
  const props = mode == 'field' ? { data: readOnlydata } : { tagList, data: void 0 };
  return (
    <ReadOnlySection
      icon={<WarningIcon />}
      expand={expand}
      id={id}
      isSubCard={isSubCard}
      {...props}
    />
  );
};

export default ReadOnly;
