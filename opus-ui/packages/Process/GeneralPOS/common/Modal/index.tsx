import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button, Icon, Modal } from 'antd';
import { ReactComponent as backIcon } from 'bpm/assets/new_back.svg';
import classNames from 'classnames';
import lodash from 'lodash';
import React, { useState } from 'react';
import styles from './index.less';

interface IParams {
  show: boolean;
  setShow: Function;
  onConfirm: () => Promise<any>;
  onCancel?: () => Promise<void>;
  onBeforeBack?: () => Promise<void>;
  children: any;
  width?: number | string;
  forceRender?: boolean;
  loading?: boolean;
  actionConfig?: any;
  visibility?: boolean;
  maskClosable?: boolean;
  getContainer?: string | HTMLElement | (() => HTMLElement) | false | null;
}

const Modals = ({
  show,
  setShow = () => {},
  children,
  onCancel,
  width,
  forceRender,
  visibility,
  maskClosable = false,
  onConfirm,
  getContainer,
}: IParams) => {
  const [errorCount, setErrorCount] = useState(0);

  const onReturn = async () => {
    if (onCancel) {
      onCancel();
    }
    setShow(false);
  };

  const List = [
    {
      id: 'confirm',
      label: 'venus_claim.button.confirm',
      iconType: 'check-circle',
      handler: async () => {
        onConfirm();
      },
      order: 1,
      disabled: errorCount > 0,
      error: {
        label: 'app.navigator.task-detail-of-data-capture.button.error',
        iconType: 'stop',
        count: errorCount,
      },
    },
    {
      id: 'return',
      label: 'Return',
      iconType: 'return',
      handler: onReturn,
      order: 2,
    },
  ];
  const iconCustom = {
    return: {
      icon: backIcon,
      className: styles.backIcon,
    },
  };
  return (
    <>
      <Modal
        width={width || '70%'}
        centered
        className={classNames(styles.modalWrap, { [styles.modalWrapHidden]: visibility })}
        visible={show}
        onCancel={onCancel}
        footer={null}
        mask={!visibility}
        maskClosable={maskClosable}
        forceRender={forceRender || false}
        getContainer={getContainer}
      >
        <div className={styles.wrap}>
          <div className={styles.leftWrap}>
            <div className={styles.buttonGroup}>
              {lodash.map(List, (item: any) => {
                const custom = iconCustom[item.iconType];

                return (
                  <Button onClick={item.handler} key={item.id} disabled={item.disabled}>
                    <span>
                      {item.error?.count > 0 ? item.error?.count : ''}
                      {formatMessageApi({
                        [item.typeCode || 'Label_BPM_Button']:
                          item.error?.count > 0 ? item.error?.label : item.label,
                      })}
                    </span>
                    {!lodash.isEmpty(custom) ? (
                      <Icon component={custom.icon} className={custom.className} />
                    ) : (
                      <Icon type={item.error?.count > 0 ? item.error?.iconType : item.iconType} />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
