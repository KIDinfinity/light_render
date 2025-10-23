import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import classNames from 'classnames';
import lodash from 'lodash';
import React from 'react';
import CustomerType from '../../CustomerInfo/CustomerType';
import type { ICustomer, IdentifyResultTagShowType } from '../types';
import styles from './index.less';
interface IProps {
  customer: ICustomer;
  identifyResultTag?: string;
  className?: string | classNames.Argument;
  identifyResultTagShow?: IdentifyResultTagShowType;
}

const CustomerInfo = (props: IProps) => {
  const { customer, identifyResultTag, className, identifyResultTagShow = true } = props;

  const { roleList, firstName, middleName, surname, customerType, clientId } =
    formUtils.objectQueryValue(customer) as ICustomer;
  const isIdentifyResultShow =
    identifyResultTagShow && typeof identifyResultTagShow === 'function'
      ? identifyResultTagShow(identifyResultTag || '')
      : identifyResultTagShow;

  return (
    <div className={classNames(styles.root, className)}>
      {clientId && <div className={styles.clientId}>Client ID {clientId || '-'}</div>}
      <div className={styles.container}>
        <div className={styles.customerInfo}>
          <div className={styles.userName}>
            {[firstName, middleName, surname].filter((item) => !!item).join(' ')}
          </div>
          <div className={styles.roleList}>
            {lodash
              .chain(roleList)
              .map((roleItem: string) => (
                <div className={styles.role} key={roleItem}>
                  <div className={styles.flag} />
                  {formatMessageApi({ Dropdown_CLM_CustomerRole: roleItem })}
                </div>
              ))
              .value()}
          </div>
          {customerType && (
            <div className={styles.customerType}>
              <CustomerType customerType={customerType} />
            </div>
          )}
        </div>
        <div className={styles.tag}>
          {isIdentifyResultShow && (
            <div className={styles.matchTag}>
              {formatMessageApi({
                Dropdown_NB_ClientTag: identifyResultTag,
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
