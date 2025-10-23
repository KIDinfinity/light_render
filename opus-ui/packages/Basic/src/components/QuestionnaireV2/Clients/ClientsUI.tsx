import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import CommonEmpty from '@/components/Empty';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const Clients = ({ customerQuestionnaireList, selectClientFn, roleByClientMap }) => {
  return (
    <div className={styles.list}>
      {lodash.isEmpty(customerQuestionnaireList) ? (
        <CommonEmpty />
      ) : (
        customerQuestionnaireList?.map((item: any) => {
          return (
            <div
              className={styles.clientItem}
              key={item?.clientKey}
              onClick={() => selectClientFn(item?.clientKey)}
            >
              <div
                className={classnames(styles.userName, {
                  [styles.active]: item?.selected,
                })}
              >
                {item?.clientName}
              </div>
              {roleByClientMap?.[item?.clientKey].length > 0 ? (
                <div
                  className={classnames(styles.roles, {
                    [styles.active]: item?.selected,
                  })}
                >
                  {roleByClientMap[item?.clientKey]?.map((role: string) => (
                    <div className={styles.role} key={role}>
                      {formatMessageApi({
                        Dropdown_CLM_CustomerRole: role,
                      })}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Clients;
