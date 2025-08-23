import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Authorized from '@/utils/Authorized';
import { SmartCircleEnum, TypeEnum } from '@/enum/GolbalAuthority';
import { tenant, Region } from '@/components/Tenant';
import { SS, SSKey } from '@/utils/cache';
import List from './List';
import CreateCase from './Buttons/CreateCase';
import Configuration from './Buttons/Configuration';
import ReportCenter from './Buttons/ReportCenter';
import ReportCenterOld from './Buttons/ReportCenterOld';

export default () => {
  const commonAuthorityList = useSelector((state) => state.authController.commonAuthorityList);
  const list = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result && item.type === TypeEnum.Comm)
    .map((item) => item.authorityCode)
    .value();

  const listLength = list.filter(
    (item: any) =>
      item === SmartCircleEnum.RS_CreateCase_enter ||
      item === SmartCircleEnum.ConfigurationCenter ||
      item === SmartCircleEnum.report_center_entry_button
  ).length;

  const getConfig = () => {
    return SS.getItem(SSKey.CONFIGS) || {};
  };

  return (
    <List
      listLength={getConfig().region === 'TH' ? listLength + 1 : listLength}
      list={[
        {
          type: 'CreateCase',
          typeCode: 'Label_BIZ_Claim',
          dictCode: 'navigator.title.createCase',
        },
        {
          type: 'Configuration',
          typeCode: 'Label_BIZ_Claim',
          dictCode: 'navigator.title.configuration',
        },
        {
          type: 'ReportCenter',
          typeCode: 'Label_BIZ_Claim',
          dictCode: 'navigator.title.reportCenter',
        },
        {
          type: 'ReportCenterOld',
          typeCode: 'Label_BIZ_Claim',
          dictCode: 'Report Center (old)',
        },
      ]}
    >
      <Authorized authority={[SmartCircleEnum.RS_CreateCase_enter]} currentAuthority={list}>
        <CreateCase type="CreateCase" />
      </Authorized>
      <Authorized authority={[SmartCircleEnum.ConfigurationCenter]} currentAuthority={list}>
        <Configuration type="Configuration" />
      </Authorized>
      <Authorized authority={[SmartCircleEnum.report_center_entry_button]} currentAuthority={list}>
        <ReportCenter type="ReportCenter" />
      </Authorized>
      {tenant.region({
        [Region.TH]: () => (
          <Authorized authority={[]} currentAuthority={list}>
            <ReportCenterOld type="ReportCenterOld" />
          </Authorized>
        ),
      })}
    </List>
  );
};
