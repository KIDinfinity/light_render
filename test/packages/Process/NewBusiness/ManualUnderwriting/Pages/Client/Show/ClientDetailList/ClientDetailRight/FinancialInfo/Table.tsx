import React, { useMemo } from 'react';
import { Table } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import useGetSectionConfigWithRole from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { localConfig } from '../../../../_section/financialInfoTable';

export default ({ clientId }: any) => {
  const crtInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities.clientMap?.[clientId]?.crtInfoList,
    shallowEqual
  );
  const crtInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.crtInfoMap,
    shallowEqual
  );
  const usTaxFlag = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.financialInfo?.usTaxFlag
  );

  const dataSource = lodash
    .map(crtInfoList, (id: string) => crtInfoMap[id])
    .filter((item) =>
      tenant.region({
        [Region.ID]:
          item?.ctfType === 'TN' &&
          item?.type === 'S' &&
          item.deleted !== 1 &&
          item.ctfCountryCode !== 'RI',
        notMatch: item?.ctfType === 'TN' && item?.type === 'S' && item.deleted !== 1,
      })
    );

  const config = useGetSectionConfigWithRole({
    section: localConfig.section,
    localConfig,
    clientId,
  });
  const columns = useMemo(() => {
    return transTableRowsConfig({
      config,
    });
  }, [config]);
  const isShow = tenant.region({
    [Region.MY]: true,
    [Region.ID]: true,
    notMatch: formUtils.queryValue(usTaxFlag) === 'Y',
  });

  return isShow && !lodash.isEmpty(dataSource) && lodash.size(config) > 0 ? (
    <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} />
  ) : null;
};
