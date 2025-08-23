import React, { useMemo } from 'react';
import { Table } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import useGetSectionConfigWithRole from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';


import { localConfig } from '../../../../_section/contactInfoTable';
import useJudgeEvevryFieldsDisplay from 'process/NewBusiness/ManualUnderwriting/_hooks/useJudgeEvevryFieldsDisplay';

export default ({ clientId }: any) => {
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities.clientMap?.[clientId]?.contactInfoList,
    shallowEqual
  );
  const contactInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.contactInfoMap,
    shallowEqual
  );

  const dataSources = lodash.map(contactInfoList, (id: string) => contactInfoMap?.[id]);
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );

  const config = useGetSectionConfigWithRole({
    section: localConfig.section,
    localConfig,
    clientId,
  });
  const columns = useMemo(() => {
    // TODO 优化table 配置，以及合并render的处理
    const temp = transTableRowsConfig({
      config,
    });
    return lodash.map(temp, (item) => {
      return {
        ...item,
        render: (text: any, record: any) => {
          if (item.key === 'contactNo') {
            const { contactNo, countryCode, areaCode } = record;
            const codeList = [countryCode, areaCode, contactNo];

            return lodash.filter(codeList, (code) => !lodash.isNil(code)).join('');
          }

          if (item.key === 'contactType') {
            const typeCode = lodash.get(
              lodash.find(config, { field: 'contactType' }),
              'field-props.x-dict.dictTypeCode'
            );
            return typeCode ? formatMessageApi({ [typeCode]: text }) : text;
          }
          return text;
        },
      };
    });
  }, [config]);
  const isDisplayAll = useJudgeEvevryFieldsDisplay({ id: clientId });
  const isShow = useMemo(() => {
    if (isDisplayAll) return true;
    if (!expandedClientId) return false;
    if (lodash.size(columns) === 0 || lodash.size(contactInfoList) === 0) return false;
    return true;
  }, [columns, contactInfoList, expandedClientId, isDisplayAll]);

  return isShow && !lodash.isEmpty(dataSources) ? (
    <Table rowKey="id" columns={columns} dataSource={dataSources} pagination={false} />
  ) : null;
};
