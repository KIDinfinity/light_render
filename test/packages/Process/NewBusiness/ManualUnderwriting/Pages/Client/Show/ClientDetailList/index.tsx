import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import ClientDetail from './ClientDetail';
import styles from '../../index.less';
import useFilterFamilyGroupClientList from '../../_hooks/useFilterFamilyGroupClientList';

export default () => {
  const list = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.clientInfoList,
    shallowEqual
  );
  const authorisedSignatoryClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.authorisedSignatoryClientId
  );
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const filteredList = useFilterFamilyGroupClientList(list)
  const disPlayList = useMemo(() => {
    if (expandedClientId) return [expandedClientId];
    const clientList = lodash.filter(filteredList, (id) => id !== authorisedSignatoryClientId);
    return lodash.slice(clientList, 0, 2);
  }, [expandedClientId, filteredList, authorisedSignatoryClientId]);

  return (
    <div className={styles.clientDetailList}>
      <Row gutter={[16, 16]} type="flex">
        {lodash.map(disPlayList, (clientId: string) => {
          return (
            <Col key={clientId} span={expandedClientId ? 24 : 12}>
              <ClientDetail clientId={clientId} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
