import Modal from 'process/GeneralPOS/common/Modal';
import React from 'react';
import type { IdentifyResultTagShowType, IIdentificationData } from '../types';
import CustomerIndentificationModalItem from './CustomerIdentificationModalItem';
import styles from './index.less';

interface IProps {
  onConfirm: () => Promise<void>;
  onCancel?: () => Promise<void>;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  identificationDataList: IIdentificationData[];
  getContainer?: string | HTMLElement | (() => HTMLElement) | false | null;
  identifyResultTagShow?: IdentifyResultTagShowType;
}

const CustomerIdentificationModal = function (props: IProps) {
  const {
    onConfirm,
    onCancel,
    visible,
    setVisible,
    identificationDataList,
    getContainer,
    identifyResultTagShow = true,
  } = props;

  return (
    <Modal
      onConfirm={onConfirm}
      show={visible}
      setShow={setVisible}
      onCancel={onCancel}
      getContainer={getContainer}
    >
      <div className={styles.listContainer}>
        {identificationDataList &&
          identificationDataList.map((data: IIdentificationData, index: number) => {
            return (
              <CustomerIndentificationModalItem
                key={data.key || index}
                identifyResultTagShow={identifyResultTagShow}
                {...data}
              />
            );
          })}
      </div>
    </Modal>
  );
};

export default CustomerIdentificationModal;
