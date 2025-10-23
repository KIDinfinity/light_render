import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Collapse } from 'antd';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getRoleList } from '../../_functions';
import { tenant } from '@/components/Tenant';
import styles from './fullClientInfo.less';
import Section from '../../_component/Section/index';
import MIBTagList from 'opus/Modules/360/_component/MIBTagList';

const transConfig = {
  dateOfBirth: { type: 'date' },
  occupationCode: {
    type: 'pair',
    codeField: 'occupationCode',
    nameField: 'occupationCode',
  },
  impairmentCodeList: {
    render: ({ content }: any) => {
      return <MIBTagList impairmentCodeList={content} inActive />;
    },
  },
};

export default ({ client, isOnlyClient }) => {
  const dispatch = useDispatch();

  const activeClientId = useSelector(({ insured360 }: any) => insured360?.activeClientId);
  const clientInfo = client.clientInfo || {};
  const activeRole: string = useSelector(({ insured360 }: any) => insured360.activeRole) || '';

  const clientRoles = useSelector(({ insured360 }: any) => insured360.clientRoles);

  const isActive = client.keyClientId === activeClientId;

  const callee = clientInfo?.gender === 'M' ? 'Mr.' : 'Mrs.';
  const name = lodash.compact([
    callee,
    clientInfo?.firstName,
    clientInfo?.middleName,
    clientInfo?.surname,
  ]);

  const handleChange = (role) => {
    if (client?.keyClientId !== activeClientId) {
      dispatch({
        type: 'insured360/saveActive360Info',
        payload: {
          activeClientId: client?.keyClientId,
        },
      });
    }
    dispatch({
      type: 'insured360/saveActiveRole',
      payload: {
        activeRole: role !== activeRole ? role : '',
      },
    });
  };

  return (
    <div
      className={classNames(styles.fullClientInfo, {
        [styles.active]: isActive,
        [styles.onlyClient]: isOnlyClient,
      })}
      onClick={() => handleChange()}
    >
      <Collapse bordered={false} defaultActiveKey={isOnlyClient ? client.keyClientId : ''}>
        <Collapse.Panel
          key={client.keyClientId}
          showArrow={!isOnlyClient}
          disabled={isOnlyClient}
          header={
            <>
              <div className={styles.name}>
                {lodash.join(name, ' ')}
                {lodash.map(getRoleList({ item: client, clientRoles }), (role, idx) => (
                  <div
                    key={`${role}_${idx}`}
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleChange(role);
                    }}
                    className={classNames(styles.role, activeRole === role && styles.active)}
                  >
                    {formatMessageApi(
                      tenant.isJP()
                        ? { Dropdown_CLM_CustomerRole: role }
                        : { Dropdown_Opus_CustomerRole: role }
                    )}
                  </div>
                ))}
              </div>
            </>
          }
        >
          <Section
            sectionId={'Client'}
            transConfig={transConfig}
            overrideSpan={!isOnlyClient && 8}
            data={{
              ...clientInfo,
              age: clientInfo?.dateOfBirth && moment().diff(clientInfo?.dateOfBirth, 'years'),
            }}
          />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
