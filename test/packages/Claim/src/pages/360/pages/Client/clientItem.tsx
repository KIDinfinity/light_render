import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getRoleList } from '../../_model/functions';
import styles from './clientItem.less';

export default ({ item, activeClientId }: any) => {
  const dispatch = useDispatch();

  const activeRole: string = useSelector(({ insured360 }: any) => insured360.activeRole) || '';

  const { clientInfo } = item;
  const name = lodash.compact([clientInfo?.firstName, clientInfo?.middleName, clientInfo?.surname]);

  const handleChange = ({ role }: { role?: string }) => {
    if (clientInfo?.clientId !== activeClientId) {
      dispatch({
        type: 'insured360/saveActive360Info',
        payload: {
          activeClientId: clientInfo?.clientId,
        },
      });
    }
    dispatch({
      type: 'insured360/saveActiveRole',
      payload: {
        activeRole: clientInfo?.clientId === activeClientId && role !== activeRole ? role : '',
      },
    });
  };

  return (
    <div
      className={classNames(
        styles.userInfo,
        activeClientId === clientInfo?.clientId ? styles.active : null
      )}
      onClick={(e: any) => {
        e.stopPropagation();
        handleChange({ role: '' });
      }}
    >
      <div className={styles.name}>{lodash.join(name, '.')}</div>
      <div className={styles.information}>
        <span>{formatMessageApi({ Gender: clientInfo?.gender })}</span>
        {clientInfo?.dateOfBirth && (
          <span>
            {moment().diff(moment(clientInfo?.dateOfBirth), 'years')}{' '}
            {formatMessageApi({ Label_BIZ_Individual: 'Age' })}
          </span>
        )}
        <span>{formatMessageApi({ Dropdown_CLM_Occupation: clientInfo?.occupationCode })}</span>
      </div>
      <div className={styles.individual}>
        {lodash.map(getRoleList({ item }), (role, idx) => (
          <span
            key={`${role}_${idx}`}
            onClick={(e: any) => {
              e.stopPropagation();
              handleChange({ role });
            }}
            className={classNames(styles.role, activeRole === role ? styles.active : null)}
          >
            {formatMessageApi({ Dropdown_CLM_CustomerRole: role })}
          </span>
        ))}
      </div>
    </div>
  );
};
