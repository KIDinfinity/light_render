import React, { useMemo } from 'react';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import filter from 'process/NB/ManualUnderwriting/utils/dataFilter';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetCountryDropdown';
import { localConfig } from './Section';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';
import OccupationRiskLevel from 'process/NB/ManualUnderwriting/Enum/OccupationRiskLevel';
import useLoadCfgOccupationRiskLevel from 'process/NB/ManualUnderwriting/_hooks/useLoadCfgOccupationRiskLevel';
import lodash from 'lodash';
import useGetOccupationCodes from 'process/NB/ManualUnderwriting/_hooks/useGetOccupationCodes';
import useLoadOccupationDropdown from 'process/NB/ManualUnderwriting/_hooks/useLoadOccupationDropdown';
import Dictionary from 'enum/Dictionary';
import useGetDropdownDicts from 'process/NB/ManualUnderwriting/_hooks/useGetDropdownDicts';
const section = 'BackgroundInfo-Field';

export default ({ expand, id, isSubCard }: any) => {
  const occupationFullList = useSelector(
    (state: any) => state[NAMESPACE].occupationFullList,
    shallowEqual
  );

  const clientInfoList =
    useSelector(
      (state) => state[NAMESPACE].businessData.policyList[0].clientInfoList,
      shallowEqual
    ) || [];
  const currentClient = clientInfoList.find((item) => item.id === id);

  let config = useGetSectionAtomConfig({
    section,
    localConfig,
  });

  const cfgOccupationRiskLevel = useSelector(
    ({ [NAMESPACE]: model }) => model.cfgOccupationRiskLevel
  );

  useLoadCfgOccupationRiskLevel();
  config = useMemo(() => {
    return config.filter((item) => {
      if (
        ('exactAffiliation1' === item.field && currentClient?.industryAffiliation1 !== 'Y') ||
        ('exactAffiliation2' === item.field && currentClient?.industryAffiliation2 !== 'Y')
      ) {
        return false;
      }
      if (
        ('exactAffiliation1List' === item.field && currentClient?.industryAffiliation1 !== 'Y') ||
        ('exactAffiliation2List' === item.field && currentClient?.industryAffiliation2 !== 'Y')
      ) {
        return false;
      }
      return true;
    });
  }, [config, currentClient]);

  let occcupationCodeConfig;
  lodash.map(config, (item) => {
    if (item.field === 'occupationCode') {
      occcupationCodeConfig = item;
    }
  });
  useLoadOccupationDropdown();
  const dicts: any = useGetOccupationCodes({
    id: currentClient?.id,
    config: occcupationCodeConfig,
    parentCode: currentClient?.natureOfBusiness,
    field: 'occupationCode',
  });
  const countryDataSource = useGetCountryDropdown();

  const notMatchDict = useGetDropdownDicts({
    occupationSubGroup: Dictionary.Dropdown_IND_OccupationSubGroup,
    position: Dictionary.Dropdown_IND_PositionHeld,
    natureOfBusiness: Dictionary.Dropdown_IND_NatureofBusiness,
  });
  // VN特殊处理数据源
  const extraDicts = tenant.region({
    [Region.VN]: () => {
      const VNDict = {
        employerCountry: countryDataSource,
        occupationCode: dicts,
        occupationSubGroup: occupationFullList?.Dropdown_IND_Occupation,
        position: occupationFullList?.Dropdown_IND_PositionHeld,
        natureOfBusiness: occupationFullList?.Dropdown_IND_NatureofBusiness,
      };
      return VNDict;
    },
    notMatch: () => {
      return notMatchDict;
    },
  });

  const data = useGetDataBySection({ section, id, config, extraDicts });

  const natureofbusinessVisible = useMemo(() => {
    return tenant.region({
      [Region.VN]: () => {
        const occupationData = lodash.get(currentClient, 'occupationCode');
        const cfg = lodash.find(
          cfgOccupationRiskLevel,
          (cfgItem) => cfgItem.code === occupationData
        );
        return cfg ? cfg.riskLevel === OccupationRiskLevel.HighRisk : false;
      },
      notMatch: true,
    });
  }, [data, cfgOccupationRiskLevel]);

  const blackList = useMemo(() => {
    const list = [
      'employerCountry',
      'employerZipCode',
      'employerAddressLine1',
      'employerAddressLine2',
      'employerAddressLine3',
      'employerAddressLine4',
    ];
    return natureofbusinessVisible ? list : [...list, 'natureOfBusiness'];
  }, [natureofbusinessVisible]);

  const filterData = filter({
    data,
    blackList,
  });

  return (
    <ReadOnlySection
      data={filterData}
      icon="profile"
      expand={expand}
      id={id}
      isSubCard={isSubCard}
    />
  );
};
