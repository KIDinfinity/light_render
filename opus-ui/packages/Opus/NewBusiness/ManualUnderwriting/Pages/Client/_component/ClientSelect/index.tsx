import React from 'react';
import { useSelector } from 'dva';
import { Icon } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Roles from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/Roles';
import NewClientFlag from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/NewClientFlag';
import ClientName from '../ClientName';
import styles from './index.less';
import { formUtils } from 'basic/components/Form';

const CustomerTypeTag = ({ clientId, readOnly = true }: any) => {
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );

  const modalCustomerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );
  const _customerType = readOnly ? customerType : modalCustomerType;
  return _customerType ? (
    <div className={styles.customerType}>
      {formatMessageApi({
        Dropdown_CLM_CustomerType: formUtils.queryValue(_customerType),
      })}
    </div>
  ) : null;
};

export default ({ clientId, handleSelect, readOnly = true, extraStyles, editMode }: any) => {
  return (
    <div onClick={handleSelect} className={styles.clientSelectItem} style={extraStyles}>
      <div className={styles.name}>
        <ClientName
          clientId={clientId}
          readOnly={readOnly}
          hasWarnIcon={editMode === 'plain'}
          className={styles.nameFontSize}
        />
        <div className={styles.downIcon}>
          <Icon type="down" />
        </div>
      </div>
      <div className={styles.tagList}>
        <NewClientFlag clientId={clientId} />
        <CustomerTypeTag clientId={clientId} readOnly={readOnly} />
        <Roles clientId={clientId} readOnly={readOnly} />
      </div>
    </div>
  );
};
