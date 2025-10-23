import React from 'react';
import { ReactComponent as ClientIcon } from 'opus/Assets/client.svg';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Name from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/ClientName';
import NewClientFlag from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/NewClientFlag';
import CustomerType from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/CustomerType';
import Roles from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/Roles';
import ClientDetailRight from '../ClientDetailRight';
import ExpandButton from '../ExpandButton';
import Layout from './Layout';
import { useDispatch } from 'dva';
import ExpandableCardForClient from 'opus/NewBusiness/ManualUnderwriting/_components/ExpandableCardForClient';

export default ({ clientId, editMode }: any) => {
  const dispatch = useDispatch();
  return (
    <ExpandableCardForClient
      title={'Client Information'}
      clientId={clientId}
      icon={ClientIcon}
      editModalProps={{
        onAfterConfirm: () => {},
        onBeforeBack: () => {},
        onBeforeOpen: () => {
          dispatch({
            type: `${NAMESPACE}/saveShowModal`,
            payload: {
              type: 'client',
            },
          });
          dispatch({
            type: `${NAMESPACE}/setEditingClientId`,
            payload: { clientId },
          });
        },
        children: <></>,
      }}
      footer={<ExpandButton clientId={clientId} />}
    >
      <Layout>
        <Name clientId={clientId} readOnly hasWarnIcon={editMode === 'plain'} />
        <NewClientFlag clientId={clientId} />
        <CustomerType clientId={clientId} />
        <Roles clientId={clientId} />
        <ClientDetailRight clientId={clientId} />
      </Layout>
    </ExpandableCardForClient>
  );
};
