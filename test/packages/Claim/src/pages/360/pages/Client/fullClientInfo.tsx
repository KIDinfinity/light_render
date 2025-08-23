import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import { getRoleList } from '../../_model/functions';
import { tenant, Region } from '@/components/Tenant';
import styles from './fullClientInfo.less';

const { DataItem } = DataLayout;

export default () => {
  const dispatch = useDispatch();

  const sideBarOverallList = useSelector(({ insured360 }: any) => insured360?.sideBarOverallList);
  const activeClientId = useSelector(({ insured360 }: any) => insured360?.activeClientId);
  const clientInfo = useSelector(({ insured360 }: any) => insured360?.clientInfo);
  const activeRole: string = useSelector(({ insured360 }: any) => insured360.activeRole) || '';

  const sideBarItem =
    lodash.find(sideBarOverallList, (el: any) => el.keyClientId === activeClientId) || {};

  const name = lodash.compact([clientInfo?.firstName, clientInfo?.middleName, clientInfo?.surname]);

  return (
    <div className={styles.fullClientInfo}>
      <div className={styles.name}>
        <span>{lodash.join(name, '.')}</span>
        {lodash.size(sideBarOverallList) > 0 && (
          <span className={styles.roles}>
            {lodash.map(getRoleList({ item: sideBarItem }), (role, idx) => (
              <span
                key={`${role}_${idx}`}
                onClick={() => {
                  dispatch({
                    type: 'insured360/saveActiveRole',
                    payload: {
                      activeRole: role === activeRole ? '' : role,
                    },
                  });
                }}
                className={classNames(styles.role, activeRole === role && styles.active)}
              >
                {formatMessageApi({ Dropdown_CLM_CustomerRole: role })}
              </span>
            ))}
          </span>
        )}
      </div>

      <DataLayout span={6}>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'Gender' })}
        >
          {formatMessageApi({ Gender: clientInfo?.gender })}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'DateofBirth' })}
        >
          {moment(clientInfo?.dateOfBirth).format('YYYY.MM.DD')}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'Occupation' })}
        >
          {formatMessageApi({ Dropdown_CLM_Occupation: clientInfo?.occupationCode })}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'Smoker' })}
        >
          {clientInfo?.smoker}
        </DataItem>
      </DataLayout>
      <DataLayout span={12}>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Claim: 'venus.navigator.label.phone-no' })}
        >
          {clientInfo?.phoneNo}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'email' })}
        >
          {clientInfo?.email}
        </DataItem>
      </DataLayout>
      <DataLayout span={12}>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'ContactAddr' })}
        >
          {clientInfo?.address}
        </DataItem>
        {tenant.region() === Region.PH ? (
          <DataItem
            className={styles.infoItem}
            title={formatMessageApi({ Label_BPM_CaseInfo: 'VIP' })}
          >
            {clientInfo?.vip}
          </DataItem>
        ) : (
          <></>
        )}
      </DataLayout>
    </div>
  );
};
