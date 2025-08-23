import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import type { ICustomerIdentificationProps } from 'process/GeneralPOS/BaseProduct/SectionComponents/CustomerIdentification/types';
import { IdentificationClientTagEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import CustomerIdentification from '..';
import styles from './index.less';

const infoMsgMap = {
  [IdentificationClientTagEnum.FullyMatch]: 'FullyMatch',
  [IdentificationClientTagEnum.Mismatch]: 'Mismatch',
  [IdentificationClientTagEnum.SuspectClient]: 'ProbableMatch',
};

const CustomerIdentificationModalItem = (props: ICustomerIdentificationProps) => {
  const {
    identifyResultTag,
    customerInfo,
    identificationList,
    selectedId,
    handleSelected,
    className,
    identifyResultTagShow,
  } = props;
  const infoMessage = identifyResultTag
    ? formatMessageApi({ Dropdown_POL_DedupResult: infoMsgMap[identifyResultTag] })
    : '';

  return (
    <div className={classNames(styles.itemWapper, className)}>
      <div className={styles.info}>{infoMessage}</div>
      <CustomerIdentification
        identifyResultTag={identifyResultTag}
        customerInfo={customerInfo}
        identificationList={identificationList}
        selectedId={selectedId}
        handleSelected={handleSelected}
        identifyResultTagShow={identifyResultTagShow}
      />
    </div>
  );
};

export default CustomerIdentificationModalItem;
