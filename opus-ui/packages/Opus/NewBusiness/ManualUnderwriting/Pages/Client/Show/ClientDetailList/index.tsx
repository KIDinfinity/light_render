import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import ClientDetail from './ClientDetail/index';
import styles from '../../index.less';
import useFilterFamilyGroupClientList from '../../_hooks/useFilterFamilyGroupClientList';
import CustomerRole from 'basic/enum/CustomerRole';

export default ({ editMode }) => {
  const list = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.clientInfoList,
    shallowEqual
  );
  const clientMap = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.entities?.clientMap;
  }, shallowEqual);
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const filteredList = useFilterFamilyGroupClientList(list);
  const disPlayList = useMemo(() => {
    if (expandedClientId) return [expandedClientId];
    const clientList = lodash.filter(
      filteredList,
      (id) =>
        !lodash.includes(
          [
            CustomerRole.AuthorisedSignatory,
            CustomerRole.UBO,
            CustomerRole.ControllingPerson,
            CustomerRole.Director,
          ],
          clientMap?.[id]?.personalInfo?.customerRole?.[0]
        )
    );
    return lodash.slice(clientList, 0, 2);
  }, [expandedClientId, filteredList, clientMap]);

  return (
    <div className={styles.clientDetailList}>
      <Row gutter={[16, 16]} type="flex">
        {lodash.map(disPlayList, (clientId: string) => {
          return (
            <Col key={clientId} span={expandedClientId ? 24 : 12}>
              <ClientDetail clientId={clientId} editMode={editMode} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
